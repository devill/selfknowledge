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
  const admin_players = screen.getByTestId("AdministrationPlayers");
  await add_player(screen, "Foo", 0)
  await add_player(screen, "Bar", 1)
  await add_player(screen, "Jane", 2)
  await add_player(screen, "Joe", 0)
  
  expect(admin_players).toHaveTextContent("❌Foo - First stage");
  expect(admin_players).toHaveTextContent("❌Bar - Second stage");
  expect(admin_players).toHaveTextContent("❌Jane - Third stage");
  expect(admin_players).toHaveTextContent("❌Joe - First stage");

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

    let start_playing_button = screen.getByText("Start playing");
    expect(start_playing_button).toBeEnabled();

    // Start playing
    await act(async () => {
      fireEvent.click(start_playing_button);
    });

    const players = screen.getByTestId("players")
    expect(players).toHaveTextContent("Foo - First stage");
    expect(players).toHaveTextContent("Bar - Second stage");
    expect(players).toHaveTextContent("Jane - Third stage");
    expect(players).toHaveTextContent("Joe - First stage");
    expect(start_playing_button).not.toBeVisible();

    const end_game_button = screen.getByText("End Game");
    await act(async () => {
      fireEvent.click(end_game_button);
    });

    start_playing_button = screen.getByText("Start playing");
    expect(start_playing_button).toBeVisible();
    expect(start_playing_button).toBeDisabled();

    // players are removed when we end the game.
    const admin_players = screen.getByTestId("AdministrationPlayers");
    expect(admin_players).toBeEmptyDOMElement();


    //const modify_game_button = screen.getByText("Modify Game");
    //const draw_card_button = screen.getByText("Draw Card");
    // TODO seems to beep immediately when we click on the start playing button - that's not what we want, is it?
    // check listing the names of the player at the top of the page
    // check that the buttons from the previous page don't show up here
    // End playing "End Game"
    // "Modify Game"
    // Draw Card

  });
});