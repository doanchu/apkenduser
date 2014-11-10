package utils

import (
	"log"
	"strings"
)

func ClearVietnameseChars(s string) string {
	noSignChars := []string{"a", "A", "e", "E", "o", "O", "u", "U", "i", "I", "d", "D", "y", "Y"}

	vnChars := []string{
		"áàạảãâấầậẩẫăắằặẳẵ",

		"ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",

		"éèẹẻẽêếềệểễ",

		"ÉÈẸẺẼÊẾỀỆỂỄ",

		"óòọỏõôốồộổỗơớờợởỡ",

		"ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",

		"úùụủũưứừựửữ",

		"ÚÙỤỦŨƯỨỪỰỬỮ",

		"íìịỉĩ",

		"ÍÌỊỈĨ",

		"đ",

		"Đ",

		"ýỳỵỷỹ",

		"ÝỲỴỶỸ"}
	log.Println("len is", len(vnChars[1]))
	for i := 0; i < len(vnChars); i++ {
		for _, val := range vnChars[i] {
			s = strings.Replace(s, string(val), noSignChars[i], -1)
		}

	}
	return s
}
