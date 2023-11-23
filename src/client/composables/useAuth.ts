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

const cookiePath = '/'
const cookieMaxAge = 1000 * 3600 * 12

export function useAuth() {
  const removeCookies = () => {
    const cookies = new UniversalCookie()
    cookies.remove('mail', {path: cookiePath, maxAge: cookieMaxAge })
    cookies.remove('is_admin', {path: cookiePath, maxAge: cookieMaxAge })
    cookies.remove('subscription_expires_at', {path: cookiePath, maxAge: cookieMaxAge })
    cookies.remove('has_accepted_consents', {path: cookiePath, maxAge: cookieMaxAge })
  }

  const setCookies = (mail: string, isAdmin: boolean, subscriptionExpiresAt: string, hasAcceptedConsents: boolean, type: LoginType) => {
    const cookies = new UniversalCookie()
    cookies.set('mail', mail, {path: cookiePath, maxAge: cookieMaxAge })
    cookies.set('is_admin', isAdmin, {path: cookiePath, maxAge: cookieMaxAge })
    cookies.set('subscription_expires_at', subscriptionExpiresAt, {path: cookiePath, maxAge: cookieMaxAge })
    cookies.set('has_accepted_consents', hasAcceptedConsents, {path: cookiePath, maxAge: cookieMaxAge })
    cookies.set('type', type, {path: cookiePath, maxAge: cookieMaxAge })
  }

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
      const {isAdmin, subscriptionExpiresAt, hasAcceptedConsents, type} = response.data.payload.user
      setCookies(mail, isAdmin, subscriptionExpiresAt, hasAcceptedConsents, type)
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
      const {isAdmin, subscriptionExpiresAt, hasAcceptedConsents, mail, type} = response.data.payload.user
      setCookies(mail, isAdmin, subscriptionExpiresAt, hasAcceptedConsents, type)
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
      const {isAdmin, subscriptionExpiresAt, hasAcceptedConsents, mail, type} = response.data.payload.user
      setCookies(mail, isAdmin, subscriptionExpiresAt, hasAcceptedConsents, type)
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
      return response.data
    } catch (e) {
      if(axios.isAxiosError(e)) {
        return e?.response?.data
      }
    } finally {
      removeCookies()
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