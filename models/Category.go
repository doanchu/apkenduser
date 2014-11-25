package models

import "strings"

type Category struct {
	Id         int    `json:"id"`
	Name       string `json:"name"`
	Icon       string `json:"icon"`
	Partner    string `json:"partner"`
	Permanlink string `json:"permalink"`
	Status     int    `json:"status"`
}

func NormalizeCategory(cat *Category) {
	if strings.Index(cat.Icon, "http") != 0 {
		cat.Icon = "http://" + ServerHost + cat.Icon
	}
}
