package controllers

import (
	"crypto/rand"
	"encoding/hex"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/AvalosRuben/GoAuth/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/argon2"
	"gorm.io/gorm"
)

type params struct{
	memory uint32
	iterations uint32
	parallelism uint8
	saltLength uint32
	keyLength uint32
}

func generateRandomBytes(n uint32) ([]byte, error) {
    b := make([]byte, n)
    _, err := rand.Read(b)
    if err != nil {
        return nil, err
    }

    return b, nil
}

func HashPassword(password string, p *params)(hash string, err error){
	salt, err := generateRandomBytes(p.saltLength)
    if err != nil {
        return "", err
    }

	rawHash := argon2.IDKey([]byte(password), salt, p.iterations, p.memory, p.parallelism, p.keyLength)
	hashString := hex.EncodeToString(rawHash)
	saltString := hex.EncodeToString(salt)

	hash = hashString + "$" + saltString

    return hash, nil

}

func HashPasswordWithSalt(password string, p *params, salt []byte)(hash string, err error){

	rawHash := argon2.IDKey([]byte(password), salt, p.iterations, p.memory, p.parallelism, p.keyLength)
	hashString := hex.EncodeToString(rawHash)
	saltString := hex.EncodeToString(salt)

	hash = hashString + "$" + saltString

    return hash, nil

}

func ComparePasswords(password string, hashedPassword string, p *params, c *gin.Context)(isEqual bool){
	hashAndSalt := strings.Split(hashedPassword, "$")
	saltString := hashAndSalt[1]
	rawSalt, err := hex.DecodeString(saltString)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Papu error checking password": err.Error()})
	}

	rawHashedInputPassword, err := HashPasswordWithSalt(password, p, []byte(rawSalt))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Papu error checking password": err.Error()})
	}

	inputHashAndSalt := strings.Split(rawHashedInputPassword, "$")

	if hashAndSalt[0] == inputHashAndSalt[0] {
		return true
	}

	return false
	
}

func Signup(db *gorm.DB)gin.HandlerFunc{

	p := &params{
        memory:      64 * 1024,
        iterations:  3,
        parallelism: 2,
        saltLength:  16,
        keyLength:   32,
    }
	
	return func(c *gin.Context){

		var user models.User
		if err:=c.BindJSON(&user);err!=nil{
			c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
			return 
		}

		hash, err := HashPassword(user.HashedPassword, p)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"Papu error on the hash":err.Error()})
		}
		
		user.HashedPassword = hash
		result := db.Create(&user)
		log.Println(result)

		
	}

}

func Login(db *gorm.DB)gin.HandlerFunc{
	p := &params{
        memory:      64 * 1024,
        iterations:  3,
        parallelism: 2,
        saltLength:  16,
        keyLength:   32,
    }
	
	return func (c *gin.Context){
		var user models.User
		var inputUser models.User
		if err := c.BindJSON(&inputUser);err!=nil{
			c.JSON(http.StatusBadRequest, gin.H{"papu error": err.Error()})
			return
		}

		result := db.Where("mail = ?",inputUser.Mail).First(&user)
		log.Println("result: ",result)

		equalPasswords := ComparePasswords(inputUser.HashedPassword, user.HashedPassword,p, c)

		if equalPasswords {
			log.Println("Equal")
		} else{
			log.Println("Not Equal")
		}
		
		c.JSON(http.StatusOK,inputUser)

	}
}

func GetUsers(db *gorm.DB)gin.HandlerFunc{
	return func (c *gin.Context){

		limit := c.DefaultQuery("limit","10")
		limitNumber , err := strconv.Atoi(limit)

		offset := c.DefaultQuery("offset","0")
		offsetNumber, offErr := strconv.Atoi(offset)

		if offErr != nil {
			log.Panic("Papu error en el offset: ", err)
		}

		if err != nil {
			log.Panic("Papu error en el parsing: ",err)
		}
		
		var users []models.User
		result := db.Limit(limitNumber).Offset(offsetNumber).Find(&users)


		if result.Error != nil {
			c.JSON(http.StatusBadRequest, gin.H{"Papu error: ":result.Error})
			return
		}
		c.JSON(http.StatusOK,users)
	}
}