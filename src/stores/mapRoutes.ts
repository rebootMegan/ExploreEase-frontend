import { defineStore } from 'pinia';
import chatApi from "/@/api/chat";
import { ElMessage } from 'element-plus';
import { Local } from '/@/utils/storage';


interface mapEventState {
    userInfo: object,
    showLogin: boolean,
    token: string,
    sessionId: string,

}

export const useMapStore = defineStore('map', {
    state: (): mapEventState => ({
        showLogin: false,
        token: Local.get('token') || '',
        sessionId: Local.get('sessionId') || '',
        userInfo: Local.get('userInfo') || {},
    }),
    actions: {
        async login(e: object) {
            try {
                const res = await chatApi._login({ api_key: e.api_key || '', username: e.userName || 'admin', passwd: e.passwd || e.password || 'admin' })
                if (res?.code === 0) {
                    ElMessage({
                        message: res.msg,
                        grouping: true,
                        type: 'success',
                        duration: 1500,
                    });
                    this.token = res.data?.token
                    this.showLogin = false
                    this.userInfo = res?.data
                    Local.set('userInfo', res?.data || {})
                    Local.set('token', this.token || '')
                    this.createNewChat()
                    return true
                } else {
                    ElMessage.error(res?.msg);
                    return false
                }
            } catch (error) {

            }
        },
        async register(e: object) {
            try {
                const res = await chatApi._register({ username: e.userName, passwd: e.passwd || e.password, email: e.userName })
                if (res?.code === 0) {
                    ElMessage({
                        message: res.msg,
                        grouping: true,
                        type: 'success',
                        duration: 1500,
                    });
                    return true
                } else {
                    ElMessage.error(res?.msg);
                    return false
                }
            } catch (error) {

            }
        },
        // 创建新的会话
        createNewChat(e: object) {
            chatApi._new_chat_pri({}).then(res => {
                this.sessionId = res?.code === 0 ? res?.data?.session_id : ''
                Local.set('sessionId', this.sessionId)
            })
        },
        logOut() {
            Local.set('userInfo', {})
            Local.set('token', '')
            Local.set('sessionId', '')
            this.userInfo = {}
            this.token = ''
            this.sessionId = ''
        }
    },

});
