package models

type Banner struct {
	Name      string `json:"name"`
	Banner    string `json:"banner"`
	Link      string `json:"link"`
	Permalink string `json:"permalink"`
	Cell_data bool   `json:"cellData"`
}
