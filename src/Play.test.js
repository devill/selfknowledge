import { render, fireEvent, waitFor, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';

const add_player = async (screen, name, stage) => {
  const input = screen.getByTestId("player-name");
  fireEvent.change(input, {target: {value: name}})

  const stage_selector = screen.getByTestId("deck-selector");
  fireEvent.change(stage_selector, { target: { value: stage } });

  const add_player_button = screen.getByText("Add player");
  
  await act(async () => {
    fireEvent.click(add_player_button);
  });
};

const add_players = async (screen) => {
  const players = screen.getByTestId("AdministrationPlayers");
  await add_player(screen, "Foo", 0)
  await add_player(screen, "Bar", 1)
  await add_player(screen, "Jane", 2)
  await add_player(screen, "Joe", 0)
  
  expect(players).toHaveTextContent("❌Foo - First stage");
  expect(players).toHaveTextContent("❌Bar - Second stage");
  expect(players).toHaveTextContent("❌Jane - Third stage");
  expect(players).toHaveTextContent("❌Joe - First stage");

};

describe("<App /> component test", () => {
  beforeAll(() => {
    jest.spyOn(window, 'fetch');
  }
  )
  it("should be able to play", async () => {
    const app = <App />;
    let screen;
    window.fetch.mockResolvedValue({
    ok: true,
    text: () => `First stage
One
Two
Three

Second stage
Four
Five
Six

Third stage
Seven
Eight`});

    await act(async () => {
      screen = render(app)
    });

    await add_players(screen);

    const start_playing_button = screen.getByText("Start playing");
    expect(start_playing_button).toBeEnabled();

    // TODO: test Start playing
  });
});