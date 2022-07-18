import { EMAILREGEX } from '../../data/consts'

import { compare, hash } from 'bcryptjs'

export const verifyPassword = async (password, hashedPassword) => {
    const isValid = await compare(password, hashedPassword)
    return isValid
}

export const hashPassword = async password => {
    const hashedPassword = await hash(password, 12)
    return hashedPassword
}

export const validateEmail = email => {
    return EMAILREGEX.test(email)
}

export const validatePassword = password => {
    if (password.trim().length < 7 || password.trim() === '') {
        return {
            isValid: false, 
            error: 'Password is too short! Min. length is 7 characters!'
        }
    }
    return {
        isValid: true,
        error: null
    }
}

export const validateName = name => {
    if (name.trim().length < 3 || name.trim() === '') {
        return {
            isValid: false, 
            error: 'Name is too short!'
        }
    }
    return {
        isValid: true,
        error: null
    }
}