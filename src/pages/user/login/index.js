import UserModel from '@/model/user'
import fa from '@/utils/fa'
import validate from "@/libs/validator"
import connect from "@/utils/connect";
import navigation from "@/utils/navigation"

Page(connect(({ user, loading }) => ({
    login: user.login,
    userLoginLoading: loading.effects["user/login"],
}))({
    userModel: new UserModel(),
    data: {
        login_type: 'password',
        username: '',
        password: '',
    },
    onLoad: async function () {

    },
    passwordLogin() {
        const { username, password } = this.data
        if (validate.isEmpty(username) === true) {
            fa.toast.show({
                title: fa.code.parse('user_phone_format_error')
            })
            return
        }
        if (validate.isEmpty(password) === true) {
            fa.toast.show({
                title: fa.code.parse('user_password_require')
            })
            return
        }
        if (validate.isMobilePhone(username, 'zh-CN') !== true) {
            fa.toast.show({
                title: fa.code.parse('user_phone_format_error')
            })
        }
        const { dispatch } = this
        dispatch({
            type: 'user/login',
            payload: {
                login_type: 'password',
                username: this.data.username,
                password: this.data.password,
            },
            callback: (e) => {
                if (e.code === 0) {
                    navigation.goBack()
                } else {
                    fa.toast.show({
                        title: fa.code.parse(this.userModel.getException().getCode())
                    })
                }
            }
        })
    },
    onWechatLoginSuccess(){
        navigation.goBack()
    },
    onWechatLoginFail(){
        fa.toast.show({
            title: "授权失败"
        })
    },
    bindUsername(event) {
        this.setData({
            username: event.detail.value
        })
    },
    bindPassword(event) {
        this.setData({
            password: event.detail.value
        })
    },
    onFindPassword(){
        navigation.navigate('user/findPassword')
    }
}))
