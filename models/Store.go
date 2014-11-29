package models

type Store struct {
	Name         string   `json:"name"`
	Partner      string   `json:"partner"`
	Img          []string `json:"img"`
	Analytics_id string   `json:"analytics_id"`
}
