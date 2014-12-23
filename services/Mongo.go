package services

import "gopkg.in/mgo.v2"
import "gopkg.in/mgo.v2/bson"
import "github.com/doanchu/apkenduser/models"
import "log"
import "math/rand"
import "strconv"
import "time"

type Mongo struct {
	Session *mgo.Session
	DB      string
}

var r = rand.New(rand.NewSource(99))

func (m *Mongo) GetStoreByPartnerId(partner string) *models.Store {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("app_store")

	result := &models.Store{}

	err := c.Find(bson.M{"partner": partner}).One(result)

	if err != nil {
		log.Println(err.Error())
		return nil
	}

	return result
}

func (m *Mongo) GetWebStoreByDomain(domain string) *models.WebStore {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("web_store")

	result := &models.WebStore{}

	err := c.Find(bson.M{"domain_link": domain}).One(result)

	if err != nil {
		log.Println(err.Error())
		return nil
	}

	return result
}

func (m *Mongo) GetWebStoreByPartner(partner string) *models.WebStore {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("web_store")

	result := &models.WebStore{}

	err := c.Find(bson.M{"domain_partner": partner}).One(result)

	if err != nil {
		log.Println(err.Error())
		return nil
	}

	return result
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
	if err != nil /*&& err != mgo.ErrNotFound*/ {
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

func (m *Mongo) GetPartnerApps(partner string, page int, limit int, sortCondition string) ([]*models.PartnerAppInfo, error) {
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
		return nil, err
	} else {
		return result, nil
	}
}

func (m *Mongo) GetPartnerAppsNotIn(partner string, page int, limit int, sortCondition string, commonAppIds []string) ([]*models.PartnerAppInfo, error) {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("partner_app_info")
	var result []*models.PartnerAppInfo
	err := c.Find(bson.M{"partner": partner, "status": 1, "id": bson.M{"$nin": commonAppIds}}).Sort(sortCondition).Skip((page - 1) * limit).Limit(limit).All(&result)

	// var byteResult []byte
	// byteResult, err = json.Marshal(result)
	if err != nil {
		log.Println(err.Error())
		return nil, err
	} else {
		return result, nil
	}
}

func (m *Mongo) GetCommonApps(page int, limit int, sortCondition string) []*models.AppCommon {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("app_common")
	var result []*models.AppCommon
	err := c.Find(bson.M{"status": 1}).Sort(sortCondition).Skip((page - 1) * limit).Limit(limit).All(&result)

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
	err := c.Find(bson.M{"$text": bson.M{"$search": query}, "status": 1}).Select(bson.M{"score": bson.M{"$meta": "textScore"}}).Sort("$textScore:score").Skip((page - 1) * limit).Limit(limit).All(&result)

	// var byteResult []byte
	// byteResult, err = json.Marshal(result)
	if err != nil {
		log.Println(err.Error())
		return nil
	} else {
		return result
	}
}

func (m *Mongo) IncIpStats(ip string, appId string, action string) {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("ip_stats")
	timeStr := time.Now().Format("060102")
	timeInt, _ := strconv.Atoi(timeStr)

	c.Upsert(bson.M{"ip": ip, "id": appId, "date": timeInt}, bson.M{"$inc": bson.M{action: 1}})
	c.Upsert(bson.M{"ip": ip, "id": "@", "date": timeInt}, bson.M{"$inc": bson.M{action: 1}})
}

func (m *Mongo) IncAppDownload(partner string, id string, date int, source string) {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("daily_app_stats")

	if source == "" {
		source = "direct"
	}

	c.Upsert(bson.M{"partner": partner,
		"id":   id,
		"date": date},
		bson.M{"$inc": bson.M{"download": 1, "downloads." + source: 1}})

	c.Upsert(bson.M{"partner": partner,
		"id":   "@",
		"date": date},
		bson.M{"$inc": bson.M{"download": 1, "downloads." + source: 1}})

	c.Upsert(bson.M{"partner": "@",
		"id":   "@",
		"date": date},
		bson.M{"$inc": bson.M{"download": 1, "downloads." + source: 1}})

	c.Upsert(bson.M{"partner": "@",
		"id":   id,
		"date": date},
		bson.M{"$inc": bson.M{"download": 1, "downloads." + source: 1}})

	c = db.C("partner_app_info")
	c.Upsert(bson.M{"id": id,
		"partner": partner},
		bson.M{"$inc": bson.M{"total_download": 1}})

	c = db.C("app_common")
	c.Upsert(bson.M{"id": id},
		bson.M{"$inc": bson.M{"total_download": 1}})
}

func (m *Mongo) IncOneStoreDownload(partner string, date int, source string) {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("daily_store_stats")

	if source == "" {
		source = "direct"
	}

	c.Upsert(bson.M{"partner": partner,
		"date": date},
		bson.M{"$inc": bson.M{"1download": 1, "1downloads." + source: 1}})
	c.Upsert(bson.M{"partner": "@",
		"date": date},
		bson.M{"$inc": bson.M{"1download": 1, "1downloads." + source: 1}})

}

func (m *Mongo) IncOneAppDownload(partner string, appId string, date int, source string) {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("daily_app_stats")

	if source == "" {
		source = "direct"
	}

	c.Upsert(bson.M{"partner": partner,
		"id":   appId,
		"date": date},
		bson.M{"$inc": bson.M{"1download": 1, "1downloads." + source: 1}})

	c.Upsert(bson.M{"partner": partner,
		"id":   "@",
		"date": date},
		bson.M{"$inc": bson.M{"1download": 1, "1downloads." + source: 1}})

	c.Upsert(bson.M{"partner": "@",
		"id":   appId,
		"date": date},
		bson.M{"$inc": bson.M{"1download": 1, "1downloads." + source: 1}})

	c.Upsert(bson.M{"partner": "@",
		"id":   "@",
		"date": date},
		bson.M{"$inc": bson.M{"1download": 1, "1downloads." + source: 1}})
}

func (m *Mongo) IncAppView(partner string, id string, date int, source string) {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("daily_app_stats")

	if source == "" {
		source = "direct"
	}

	c.Upsert(bson.M{"partner": partner,
		"id":   id,
		"date": date},
		bson.M{"$inc": bson.M{"view": 1, "views." + source: 1}})

	c.Upsert(bson.M{"partner": "@",
		"id":   id,
		"date": date},
		bson.M{"$inc": bson.M{"view": 1, "views." + source: 1}})

	c.Upsert(bson.M{"partner": partner,
		"id":   "@",
		"date": date},
		bson.M{"$inc": bson.M{"view": 1, "views." + source: 1}})

	c.Upsert(bson.M{"partner": "@",
		"id":   "@",
		"date": date},
		bson.M{"$inc": bson.M{"view": 1, "views." + source: 1}})
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

func (m *Mongo) GetCommonAppsByCategory(cid int, page int, limit int) []*models.AppCommon {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("app_common")
	var result []*models.AppCommon
	err := c.Find(bson.M{"cid": cid, "status": 1}).Skip((page - 1) * limit).Limit(limit).All(&result)

	// var byteResult []byte
	// byteResult, err = json.Marshal(result)
	if err != nil {
		log.Println(err.Error())
		return nil
	} else {
		return result
	}
}

func (m *Mongo) GetPartnerApp(partner string) (*models.PartnerAppInfo, error) {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("partner_app_info")
	result := &models.PartnerAppInfo{}
	err := c.Find(bson.M{"partner": partner, "status": 1}).One(result)
	if err != nil {
		log.Println(err.Error())
		return nil, err
	}
	return result, nil
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
	// partnerCol := db.C("partner_app_collection")
	// var result []*PartnerAppCollection
	// err := partnerCol.Find(bson.M{}).All(&result)

	// if err != nil {
	// 	log.Println(err.Error())
	// 	return nil
	// }

	// ids := []bson.ObjectId{}
	// for _, col := range result {
	// 	ids = append(ids, col.Col_id)
	// }

	c := db.C("app_collection")

	var resultCol []*models.Collection

	err := c.Find(bson.M{"status": 1}).All(&resultCol)
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

func (m *Mongo) GetCollections(page int, limit int) []*models.Collection {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	// partnerCol := db.C("partner_app_collection")
	// var result []*PartnerAppCollection
	// err := partnerCol.Find(bson.M{}).All(&result)

	// if err != nil {
	// 	log.Println(err.Error())
	// 	return nil
	// }

	// ids := []bson.ObjectId{}
	// for _, col := range result {
	// 	ids = append(ids, col.Col_id)
	// }

	c := db.C("app_collection")

	var resultCol []*models.Collection

	err := c.Find(bson.M{"status": 1}).All(&resultCol)
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

func (m *Mongo) GetAllCollections() []*models.Collection {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	// partnerCol := db.C("partner_app_collection")
	// var result []*PartnerAppCollection
	// err := partnerCol.Find(bson.M{}).All(&result)

	// if err != nil {
	// 	log.Println(err.Error())
	// 	return nil
	// }

	// ids := []bson.ObjectId{}
	// for _, col := range result {
	// 	ids = append(ids, col.Col_id)
	// }

	c := db.C("app_collection")

	var resultCol []*models.Collection

	err := c.Find(bson.M{"status": 1}).All(&resultCol)
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
	err := c.Find(bson.M{"status": 1}).All(&result)
	if err != nil {
		return nil
	}
	return result
}

func (m *Mongo) GetAllBanners() []*models.Banner {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("banner_ads")

	var result []*models.Banner
	err := c.Find(bson.M{"status": 1}).Sort("-cell_data").All(&result)
	if err != nil {
		return nil
	}
	return result
}

func (m *Mongo) GetBannersForNonCell() []*models.Banner {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("banner_ads")

	var result []*models.Banner
	err := c.Find(bson.M{"status": 1, "cell_data": false}).All(&result)
	if err != nil {
		return nil
	}
	return result
}

func (m *Mongo) GetUserByUsername(username string) *models.User {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("users")

	result := &models.User{}

	err := c.Find(bson.M{"username": username}).One(result)
	if err != nil {
		return nil
	} else {
		return result
	}
}

func (m *Mongo) GetRandomAppAds() *models.AppAds {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("app_ads")

	result := &models.AppAds{}
	mid := r.Float32()
	err := c.Find(bson.M{"status": 1, "ads_type.popup": 1, "random": bson.M{"$gte": mid}}).One(result)
	if err == mgo.ErrNotFound {
		err = c.Find(bson.M{"status": 1, "ads_type.popup": 1, "random": bson.M{"$lte": mid}}).One(result)
		if err != nil {
			return nil
		} else {
			return result
		}
	} else if err != nil {
		return nil
	} else {
		return result
	}
}

func (m *Mongo) GetAppMapper(oldAppId string) *models.AppMapper {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("app_mapper")

	result := &models.AppMapper{}

	err := c.Find(bson.M{"old_app": oldAppId}).One(result)

	if err != nil {
		return nil
	} else {
		return result
	}
}

func (m *Mongo) GetAdsConfig(config string) *models.SystemConfig {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("system_config")

	result := &models.SystemConfig{}

	err := c.Find(bson.M{"type": config}).One(result)

	if err != nil {
		return nil
	} else {
		return result
	}
}

func (m *Mongo) GetAppAds() []*interface{} {
	session := m.Session.Clone()
	defer session.Close()

	db := session.DB(m.DB)
	c := db.C("banner_inapp_ads")

	var result []*interface{}
	err := c.Find(bson.M{}).All(&result)

	if err != nil {
		return nil
	} else {
		return result
	}
}
