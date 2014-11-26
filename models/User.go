package models

import "gopkg.in/mgo.v2/bson"

type User struct {
	Oid     bson.ObjectId `bson:"_id" json:"oid"`
	Partner string        `json:"partner"`
	Store   int           `json:"store"`
}
