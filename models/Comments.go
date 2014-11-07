package models

type Comment struct {
	App_id  string `json:"app_id"`
	Partner string `json:"partner"`
	Name    string `json:"name"`
	Avatar  string `json:"avatar"`
	Content string `json:"content"`
	Time    int64  `json:"time"`
	Ip      string `json:"ip"`
}
