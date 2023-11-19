import axios, {AxiosError} from 'axios'
import {$$} from 'vue/macros'
import UniversalCookie from "universal-cookie";
import {LoginType} from "../../server/services/AuthService/enum/LoginType";

interface Response {
  success: boolean;
  errors?: string[];
  payload: {
    user: {
      mail: string,
      isAdmin: boolean,
    }
  }
}

export function useAuth() {
  const register = async (mail: string, password: string, hasAcceptedPrivatePolicy: boolean, hasAcceptedRegulations: boolean): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/register`, {
        mail,
        password,
        hasAcceptedPrivatePolicy,
        hasAcceptedRegulations,
      })
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  const verifyUser = async (secret: string): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/verification/fulfill`, {
        secret,
      })
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  const forgotPassword = async (mail: string): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/forgot-password`, {
        mail,
      })
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  const resetPassword = async (secret: string, password: string): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/reset-password`, {
        secret,
        password,
      })
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  const changePassword = async (oldPassword: string, password: string): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/me/change-password`, {
        oldPassword,
        password,
      }, {withCredentials: true})
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  const login = async (mail: string, password: string): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/login`, {
        mail,
        password,
        type: LoginType.LOCAL
      }, {withCredentials: true})
      const cookies = new UniversalCookie()
      console.info(cookies.get('access_token'))
      cookies.set('mail', response.data.payload.user.mail)
      cookies.set('is_admin', response.data.payload.user.isAdmin)
      cookies.set('subscription_expires_at', response.data.payload.user.subscriptionExpiresAt)
      cookies.set('has_accepted_consents', response.data.payload.user.hasAcceptedConsents)
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  const loginByFacebook = async (code: string): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/login`, {
        facebookCode: code,
        type: LoginType.FACEBOOK
      }, {withCredentials: true})
      const cookies = new UniversalCookie()
      cookies.set('mail', response.data.payload.user.mail)
      cookies.set('is_admin', response.data.payload.user.isAdmin)
      cookies.set('subscription_expires_at', response.data.payload.user.subscriptionExpiresAt)
      cookies.set('has_accepted_consents', response.data.payload.user.hasAcceptedConsents)
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  const loginByGoogle = async (code: string): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/login`, {
        googleCode: code,
        type: LoginType.GOOGLE
      }, {withCredentials: true})
      const cookies = new UniversalCookie()
      cookies.set('mail', response.data.payload.user.mail)
      cookies.set('is_admin', response.data.payload.user.isAdmin)
      cookies.set('subscription_expires_at', response.data.payload.user.subscriptionExpiresAt)
      cookies.set('has_accepted_consents', response.data.payload.user.hasAcceptedConsents)
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  const acceptConsents = async (hasAcceptedPrivatePolicy: boolean, hasAcceptedRegulations: boolean): Promise<Response> => {
    try {
      await axios.post(`${import.meta.env.VITE_API_HOST}/me/consents`, {
        hasAcceptedPrivatePolicy,
        hasAcceptedRegulations,
      }, {withCredentials: true})
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  //TODO types every where, and res.cookies flags
  const logout = async (): Promise<Response> => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_HOST}/me/logout`,{},{withCredentials: true})
      const cookies = new UniversalCookie()
      cookies.remove('mail')
      cookies.remove('is_admin')
      cookies.remove('subscription_expires_at')
      cookies.remove('has_accepted_consents')
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    }
  }

  return $$({
    register,
    changePassword,
    login,
    forgotPassword,
    loginByFacebook,
    loginByGoogle,
    resetPassword,
    logout,
    verifyUser,
    acceptConsents,
  })
}