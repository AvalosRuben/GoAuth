package routes

import (
	"github.com/AvalosRuben/GoAuth/controllers"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupRoutes(router *gin.Engine, db *gorm.DB){
	router.POST("/signup", controllers.Signup(db))
	router.GET("/users",controllers.GetUsers(db))
}