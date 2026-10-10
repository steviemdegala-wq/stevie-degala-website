'use client'

import { create } from 'zustand'
import { type CallType } from './booking'

interface ModalState {
  isOpen: boolean
  callType: CallType
  openModal: () => void
  openCall: (callType: CallType) => void
  closeModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  callType: 'discoverycall',
  openModal: () => set({ isOpen: true, callType: 'discoverycall' }),
  openCall: (callType) => set({ isOpen: true, callType }),
  closeModal: () => set({ isOpen: false }),
}))
