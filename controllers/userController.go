package controllers

import (
	"crypto/rand"
	"encoding/hex"
	"log"
	"net/http"

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

func HashPassword(password string, p *params)(hash []byte, err error){
	salt, err := generateRandomBytes(p.saltLength)
    if err != nil {
        return nil, err
    }

	hash = argon2.IDKey([]byte(password), salt, p.iterations, p.memory, p.parallelism, p.keyLength)

    return hash, nil

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
			log.Fatal("error on hash: ", err)
		}
		
		encodedHash := hex.EncodeToString(hash)
		
		user.HashedPassword = encodedHash
		result := db.Create(&user)
		log.Println(result)

		
	}

}