export function success(data: any = null, message: string | null = null) {
  return { success: true, data, message }
}

export function error(message: string, statusCode: number = 400) {
  return { success: false, data: null, message }
}
