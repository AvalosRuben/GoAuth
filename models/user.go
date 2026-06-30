package models

type User struct {
	ID uint `gorm:"primarykey"`
	Name string
	UserName string
	HashedPassword string
}