package models

type Category struct {
	Id         int    `json:"id"`
	Name       string `json:"name"`
	Icon       string `json:"ico"`
	Partner    string `json:"partner"`
	Permanlink string `json:"permalink"`
	Status     int    `json:"status"`
}
