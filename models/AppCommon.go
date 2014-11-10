package models

import "gopkg.in/mgo.v2/bson"

type AppCommon struct {
	Oid            bson.ObjectId     `bson:"_id" json:"oid"`
	Name           string            `bson:"name" json:"name"`
	Cid            int               `json:"cid"`
	Desc           string            `json:"desc"`
	Id             string            `json:"id"`
	Name_seo       string            `json:"name_seo"`
	Order          int               `json:"order"`
	Size           string            `json:"size"`
	Ss             []string          `json:"ss"`
	Status         int               `json:"status"`
	User_created   string            `json:"user_created"`
	Thumbnail      string            `json:"thumbnail"`
	Version        string            `json:"version"`
	Download_link  map[string]string `json:"download_link"`
	Download_type  string            `json:"download_type"`
	Adflex_config  []string          `json:"adflex_config"`
	Time_created   int64             `json:"time_created"`
	Time_updated   int64             `json:"time_updated"`
	Vendor         string            `json:"vendor"`
	Total_download int               `json:"total_download"`
}
