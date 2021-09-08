import { render, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

describe("<App /> component test", () => {
  beforeAll(() => {
    jest.spyOn(window, 'fetch');
  }
  )
  it("should be able to add a player", async () => {
    const app = <App />;
    let screen;
    window.fetch.mockResolvedValue({
    ok: true,
    text: () => `First section
One
Two

Second section
Three`});

    await act(async () => {
      screen = render(app)
    });

    // No players yet
    const players = screen.getByTestId("AdministrationPlayers");
    expect(players).toBeEmptyDOMElement();

    const input = screen.getByTestId("player-name");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("value", "");
    fireEvent.change(input, {target: {value: 'Foo'}})
    expect(input).toHaveAttribute("value", "Foo");

    expect(screen.getByText("First section")).toBeInTheDocument();

    const selector = screen.getByTestId("deck-selector");
    expect(selector).not.toBeEmptyDOMElement();

    // Add player
    const button = screen.getByText("Add player");
    await act(async () => {
      fireEvent.click(button);
    });

    expect(players).not.toBeEmptyDOMElement();
    expect(players).toHaveTextContent(/First section/);
    expect(players).toHaveTextContent("❌Foo - First section");

    // TODO: when adding a player check that the name field is not empty and remve spaces from around the name.
  });
});