// @filename: lib.types.g.ts

export type UIView = void
export type UIControl = HTMLElement | null | any
export type UIController = HTMLInputElement | HTMLElement | any
export type UISettings = any
export type UITable = HTMLElement | any
export type UIData = string | number | any
export type UIApplication = HTMLAllCollection | HTMLElement | any
export type NLData = any
export type NLControl = HTMLElement | null | any
export type NLTruncatedData = any
export type NLInt = number
export type RSTData = object
export type dataId = object

// Function agrument types
export type BackendValues = void
export type ViewValues = string
export type InterfaceModifier = void
export type NLInterfaceElement = HTMLElement | HTMLCollection | any
export type NewValue = void
export type EditValue = void

// Math types
export type MathValues = Float32Array | Int32Array | Uint8Array | Uint8Array[]
export type float32 = Float32Array // for kernels
export type int32 = Int32Array // for kernels
export type uint8 = Uint8Array
