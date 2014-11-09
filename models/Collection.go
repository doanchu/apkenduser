package models

import "gopkg.in/mgo.v2/bson"

type Collection struct {
	Oid       bson.ObjectId `bson:"_id"`
	Name      string        `json:"name"`
	Banner    string        `json:"banner"`
	Desc      string        `json:"desc"`
	Permalink string        `json:"permalink"`
	Apps      []string      `json:"apps"`
	Status    int           `json:"status"`
	Partner   string        `json:"partner"`
}

type CollectionDetails struct {
	Oid       bson.ObjectId `bson:"_id"`
	Name      string        `json:"name"`
	Banner    string        `json:"banner"`
	Desc      string        `json:"desc"`
	Permalink string        `json:"permalink"`
	Apps      []*AppCommon  `json:"apps"`
	Status    int           `json:"status"`
	Partner   string        `json:"partner"`
}
