package models

type User struct {
	ID uint `gorm:"primarykey"`
	Name string
	Mail string
	HashedPassword string
}