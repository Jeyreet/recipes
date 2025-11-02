import z from 'zod'

const id = z.preprocess(val => Number(val), z.int().positive())

export { id }
