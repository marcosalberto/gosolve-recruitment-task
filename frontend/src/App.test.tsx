import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from '@/components/ui/provider'
import App from './App'
import { vi } from 'vitest'

describe('App Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders input and button', () => {
    render(
      <Provider>
        <App />
      </Provider>
    )

    expect(screen.getByLabelText(/enter number/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('shows result when value is found', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true, result: 3 }),
      })
    ) as any)

    render(
      <Provider>
        <App />
      </Provider>
    )

    const input = screen.getByLabelText(/enter number/i)
    fireEvent.change(input, { target: { value: '5' } })

    fireEvent.click(screen.getByRole('button', { name: /search/i }))

    await waitFor(() => {
      expect(screen.getByText(/number found on position/i)).toBeInTheDocument()
      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })

  it('shows error when value is not found', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: false }),
      })
    ) as any)

    render(
      <Provider>
        <App />
      </Provider>
    )

    const input = screen.getByLabelText(/enter number/i)
    fireEvent.change(input, { target: { value: '999' } })

    fireEvent.click(screen.getByRole('button', { name: /search/i }))

    await waitFor(() => {
      expect(screen.getByText(/cannot found number position/i)).toBeInTheDocument()
    })
  })
})
