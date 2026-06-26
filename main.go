package main

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"github.com/AvalosRuben/GoAuth/models"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

const (
	host = "localhost"
	port = 5432
)

func main() {

	err:= godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	router := gin.Default()


	user := os.Getenv("POSTGRES_USER")
	password := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")

	dbInfo := fmt.Sprintf("host=%s port=%d user=%s "+
    "password=%s dbname=%s sslmode=disable",
    host, port, user, password, dbName)


	db, err := gorm.Open(postgres.Open(dbInfo), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to the DB: ", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("failed to get sql.DB:", err)
	}
	if err := sqlDB.Ping(); err != nil {
		log.Fatal("failed to ping db:", err)
	}

	fmt.Println("Database connected :p")

	db.AutoMigrate(&models.User{})
	
}