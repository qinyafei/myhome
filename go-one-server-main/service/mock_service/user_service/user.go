package user_service

import (
	"go-one-server/model"
	"go-one-server/util/errno"
	"go-one-server/util/tools"
)

func GetUserInfo(username, password string) (map[string]interface{}, error) {
	// 从数据库获取用户信息
	user, err := model.FindUser(username)
	if err != nil {
		return nil, err
	}
	// 校验密码
	if user.Password != tools.MD5V(password+user.Salt) {
		return nil, errno.ErrPasswordIncorrect
	}
	//生成jwt-token
	token, err := tools.GenerateJWT(user.UUID.String(), user.Username)
	if err != nil {
		return nil, err
	}
	return map[string]interface{}{"userInfo": user, "token": token}, nil
}
