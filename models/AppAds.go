package models

import _ "gopkg.in/mgo.v2/bson"

type AppAds struct {
	Title_ads     string `json:"title_ads"`
	Name          string `json:"name"`
	Content       string `json:"content"`
	Icon          string `json:"icon"`
	Link_download string `json:'link_download'`
}
