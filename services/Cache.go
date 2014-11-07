package services

import "github.com/garyburd/redigo/redis"
import "github.com/doanchu/apkenduser/models"
import "time"
import "log"
import "encoding/json"

func NewRedisPool(server string) *redis.Pool {
	return &redis.Pool{
		MaxIdle:     3,
		IdleTimeout: 240 * time.Second,
		Dial: func() (redis.Conn, error) {
			c, err := redis.Dial("tcp", server)
			if err != nil {
				return nil, err
			}
			return c, err
		},
		TestOnBorrow: func(c redis.Conn, t time.Time) error {
			_, err := c.Do("PING")
			return err
		},
	}
}

type Cache struct {
	Pool *redis.Pool
	DB   *Mongo
}

func (c *Cache) GetCommonAppById(id string) *models.AppCommon {
	conn := c.Pool.Get()
	defer conn.Close()

	//Get Info By Id
	strResult, err := redis.String(conn.Do("GET", id))
	if err != nil && err != redis.ErrNil {
		log.Println(err.Error())
		return nil
	}

	if len(strResult) == 0 {
		appCommon := c.DB.GetCommonAppById(id)
		if appCommon == nil {
			return nil
		}
		c.SetCommonAppById(id, appCommon)
		return appCommon
	}

	result := &models.AppCommon{}
	err = json.Unmarshal([]byte(strResult), result)
	if err != nil {
		log.Println(err.Error())
		return nil
	}

	return result
}

func (c *Cache) GetCommonAppByIds(ids ...interface{}) []models.AppCommon {
	conn := c.Pool.Get()
	defer conn.Close()
	//Get Info By Id
	strResult, err := redis.Strings(conn.Do("MGET", ids...))
	_ = strResult
	if err != nil /* && err != redis.ErrNil */ {
		log.Println(err.Error())
		return nil
	}

	result := []models.AppCommon{}
	tmp := ""
	err = json.Unmarshal([]byte(tmp), result)
	if err != nil {
		log.Println(err.Error())
		return nil
	}

	return result
}

func (c *Cache) SetCommonAppById(id string, app *models.AppCommon) {
	conn := c.Pool.Get()
	defer conn.Close()
	result, err := json.Marshal(app)
	if err != nil {
		return
	}
	conn.Do("SET", id, result)
}
