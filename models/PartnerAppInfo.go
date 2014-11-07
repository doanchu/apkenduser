package models

import "gopkg.in/mgo.v2/bson"

type PartnerAppInfo struct {
	Oid            bson.ObjectId `bson:"_id"`
	Id             string        `json:"id"`
	Name           string        `bson:"name" json:"name"`
	Desc           string        `json:"desc"`
	Cid            int           `json:"cid"`
	Seo_keyword    string        `json:"seo_keyword"`
	Seo_desc       string        `json:"seo_desc"`
	Seo_title      string        `json:"seo_title"`
	Partner        string        `json:"partner"`
	Status         int           `json:"status"`
	Total_download int           `json:"total_download"`
	Total_like     int           `json:"total_like"`
	Total_share    int           `json:"total_share"`
	Total_rate     int           `json:"total_rate"`
	Rate           int           `json:"rate"`
	Time_order     int64         `json:"time_order"`
}
