package services

import "gopkg.in/mgo.v2"
import "gopkg.in/mgo.v2/bson"
import "github.com/doanchu/apkenduser/models"
import "log"

type Mongo struct {
	Session *mgo.Session
	DB      string
}

func (m *Mongo) GetCommentsByAppId(id string, page int, limit int) []*models.Comment {
	session := m.Session.Clone()
	defer session.Close()
	db := session.DB(m.DB)
	c := db.C("comment_app")
	var result []*models.Comment
	err := c.Find(bson.M{"app_id": id}).Sort("-_id").Skip((page - 1) * limit).Limit(limit).All(&result)
	if err != nil {
		log.Println(err.Error())
		return nil
	}
	return result
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

func (m *Mongo) GetCommonAppsByIds(ids []string) []*models.AppCommon {
	session := m.Session.Clone()
	defer session.Close()
	db := session.DB(m.DB)
	c := db.C("app_common")
	var result []*models.AppCommon
	err := c.Find(bson.M{"id": bson.M{"$in": ids}}).All(&result)
	if err != nil && err != mgo.ErrNotFound {
		log.Println(err.Error())
		return nil
	}
	for _, value := range result {
		value.Desc = ""
		value.Ss = []string{}
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

func (m *Mongo) GetPartnerApps(partner string, page int, limit int, sortCondition string) []*models.PartnerAppInfo {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("partner_app_info")
	var result []*models.PartnerAppInfo
	err := c.Find(bson.M{"partner": partner, "status": 1}).Sort(sortCondition).Skip((page - 1) * limit).Limit(limit).All(&result)

	// var byteResult []byte
	// byteResult, err = json.Marshal(result)
	if err != nil {
		log.Println(err.Error())
		return nil
	} else {
		return result
	}
}

func (m *Mongo) SearchCommonApps(query string, page int, limit int) []*models.AppCommon {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("app_common")
	var result []*models.AppCommon
	err := c.Find(bson.M{"$text": bson.M{"$search": query}, "status": 1}).Sort("-total_download").Skip((page - 1) * limit).Limit(limit).All(&result)

	// var byteResult []byte
	// byteResult, err = json.Marshal(result)
	if err != nil {
		log.Println(err.Error())
		return nil
	} else {
		return result
	}
}

func (m *Mongo) GetPartnerAppsByCategory(partner string, cid int, page int, limit int) []*models.PartnerAppInfo {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("partner_app_info")
	var result []*models.PartnerAppInfo
	err := c.Find(bson.M{"partner": partner, "cid": cid, "status": 1}).Skip((page - 1) * limit).Limit(limit).All(&result)

	// var byteResult []byte
	// byteResult, err = json.Marshal(result)
	if err != nil {
		log.Println(err.Error())
		return nil
	} else {
		return result
	}
}

func (m *Mongo) GetAppCommonByAppId(appId string) *models.AppCommon {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("app_common")
	result := &models.AppCommon{}
	err := c.Find(bson.M{"id": appId}).One(&result)

	if err != nil {
		log.Println(err.Error())
		return nil
	} else {
		return result
	}
}

func (m *Mongo) GetPartnerAppById(partner string, appId string) *models.PartnerAppInfo {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("partner_app_info")
	result := &models.PartnerAppInfo{}
	err := c.Find(bson.M{"partner": partner, "id": appId}).One(&result)

	if err != nil {
		log.Println(err.Error())
		return nil
	} else {
		return result
	}
}

type PartnerAppCollection struct {
	Col_id bson.ObjectId
}

func (m *Mongo) GetCollectionById(id bson.ObjectId) *models.Collection {
	session := m.Session.Clone()
	defer session.Close()
	db := session.DB(m.DB)
	c := db.C("app_collection")

	result := &models.Collection{}

	c.Find(bson.M{"_id": id}).One(&result)
	return result
}

func (m *Mongo) GetCollectionsByPartner(partner string, page int, limit int) []*models.Collection {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	partnerCol := db.C("partner_app_collection")
	var result []*PartnerAppCollection
	err := partnerCol.Find(bson.M{}).All(&result)

	if err != nil {
		log.Println(err.Error())
		return nil
	}

	ids := []bson.ObjectId{}
	for _, col := range result {
		ids = append(ids, col.Col_id)
	}

	c := db.C("app_collection")

	var resultCol []*models.Collection

	err = c.Find(bson.M{"status": 1, "_id": bson.M{"$in": ids}}).All(&resultCol)
	if err != nil {
		log.Println(err.Error())
		return nil
	}
	return resultCol
	// var parterResul []*interface {
	// 	oid
	// }
	// partnerCol.Find(bson.M{"partner": partner, "col_id": bson.M{"$in", ids}}).All()

}

func (m *Mongo) GetAllCategories() []*models.Category {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("category_app")

	var result []*models.Category
	err := c.Find(bson.M{}).All(&result)
	if err != nil {
		return nil
	}
	return result
}
