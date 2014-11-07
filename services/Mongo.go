package services

import "gopkg.in/mgo.v2"
import "gopkg.in/mgo.v2/bson"
import "github.com/doanchu/apkenduser/models"
import "log"

type Mongo struct {
	Session *mgo.Session
	DB      string
}

func (m *Mongo) GetCommonAppById(id string) *models.AppCommon {
	session := m.Session.Clone()
	defer session.Close()
	db := session.DB(m.DB)
	c := db.C("app_common")
	result := &models.AppCommon{}
	err := c.Find(bson.M{"id": id}).One(result)
	if err != nil && err != mgo.ErrNotFound {
		log.Println(err.Error())
		return nil
	}
	return result
}

func (m *Mongo) GetCategoryById(id int) *models.Category {
	session := m.Session.Clone()
	defer session.Close()
	db := session.DB(m.DB)
	c := db.C("category_app")
	result := &models.Category{}
	err := c.Find(bson.M{"id": id}).One(result)
	if err != nil {
		log.Println(err.Error())
		return nil
	}
	return result
}

func (m *Mongo) GetPartnerApps(partner string, page int, limit int) []*models.PartnerAppInfo {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("partner_app_info")
	var result []*models.PartnerAppInfo
	err := c.Find(bson.M{"partner": partner}).Skip(page * limit).Limit(limit).All(&result)

	// var byteResult []byte
	// byteResult, err = json.Marshal(result)
	if err != nil {
		log.Println(err.Error())
		return nil
	} else {
		return result
	}
}
