import { describe, test, expect, mock } from "bun:test"
import { render, waitFor } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { ChessSinglePage } from "./ChessSinglePage"

const mockFetch = mock()
globalThis.fetch = mockFetch

describe("ChessSinglePage", () => {

  test("A sakkozó nevét betöltjük az oldallal", async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        id: 2,
        name: "Magnus Carlsen",
        birth_date: 1990,
        world_ch_won: 5,
        profile_url: "https://hu.wikipedia.org/wiki/Magnus_Carlsen",
        image_url: "https://www.sulla.hu/Carlsen.jpg"
      })
    })

    const { getByText } = render(
      <MemoryRouter initialEntries={["/chess/2"]}>
        <Routes>
          <Route path="/chess/:chessId" element={<ChessSinglePage />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getByText(/Magnus Carlsen/i)).toBeInTheDocument()
    })

  })

})