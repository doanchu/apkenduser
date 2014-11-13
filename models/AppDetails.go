package models

type AppDetails struct {
	Cid            int               `json:"cid"`
	Cname          string            `json:"cname"`
	Desc           string            `json:"desc"`
	Id             string            `json:"id"`
	Name           string            `json:"name"`
	Vendor         string            `json:"vendor"`
	Name_seo       string            `json:"name_seo"`
	Size           string            `json:"size"`
	Ss             []string          `json:"ss"`
	Status         int64             `json:"status"`
	Thumbnail      string            `json:"thumbnail"`
	Version        string            `json:"version"`
	Download_link  map[string]string `json:"download_link"`
	Download_type  string            `json:"download_type"`
	Partner        string            `json:"partner"`
	Total_download int64             `json:"total_download"`
	Total_like     int64             `json:"total_like"`
	Total_share    int64             `json:"total_share"`
	Total_rate     int64             `json:"total_rate"`
	Rate           int               `json:"rate"`
	Time_order     int64             `json:"time_order"`
}

func NewAppDetails(p *PartnerAppInfo, a *AppCommon, c *Category) *AppDetails {
	if a == nil || c == nil {
		return nil
	}
	return &AppDetails{
		Name:           p.Name,
		Desc:           p.Desc,
		Id:             a.Id,
		Cid:            p.Cid,
		Cname:          c.Name,
		Vendor:         a.Vendor,
		Name_seo:       a.Name_seo,
		Partner:        p.Partner,
		Status:         p.Status,
		Total_download: p.Total_download,
		Total_like:     p.Total_like,
		Total_share:    p.Total_share,
		Size:           a.Size,
		Ss:             a.Ss,
		Thumbnail:      a.Thumbnail,
		Version:        a.Version,
		Download_link:  a.Download_link,
		Download_type:  a.Download_type,
		Time_order:     p.Time_order,
	}
}

func NewAppDetailsFromAppCommon(a *AppCommon, c *Category) *AppDetails {
	return &AppDetails{
		Name:           a.Name,
		Desc:           a.Desc,
		Id:             a.Id,
		Cid:            a.Cid,
		Cname:          c.Name,
		Vendor:         a.Vendor,
		Name_seo:       a.Name_seo,
		Partner:        "",
		Status:         a.Status,
		Total_download: 0,
		Total_like:     0,
		Total_share:    0,
		Size:           a.Size,
		Ss:             a.Ss,
		Thumbnail:      a.Thumbnail,
		Version:        a.Version,
		Download_link:  a.Download_link,
		Download_type:  a.Download_type,
	}
}
