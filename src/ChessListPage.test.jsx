import { describe, test, expect, mock } from "bun:test"
import { render, waitFor } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import axios from "axios"

import { ChessListPage } from "./ChessListPage"

mock.module("axios", () => ({
  default: {
    get: mock()
  }
}))

describe("ChessListPage", () => {

  test("betölti és megjeleníti a sakkozókat", async () => {

    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 2,
          name: "Magnus Carlsen",
          birth_date: 1990,
          world_ch_won: 5,
          profile_url: "https://hu.wikipedia.org/wiki/Magnus_Carlsen",
          image_url: "https://www.sulla.hu/Carlsen.jpg"
        }
      ]
    })

    const { getByText } = render(
      <MemoryRouter>
        <ChessListPage />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getByText(/Magnus Carlsen/i)).toBeInTheDocument()
    })
  })

})  