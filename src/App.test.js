import { render, fireEvent, waitFor, within } from '@testing-library/react';
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
    text: () => `First stage
One
Two

Second stage
Three
Four`});

    await act(async () => {
      screen = render(app)
    });

    // No players yet
    const players = screen.getByTestId("AdministrationPlayers");
    expect(players).toBeEmptyDOMElement();

    // Start playing button is disabled
    const start_playing_button = screen.getByText("Start playing");
    expect(start_playing_button).toBeVisible();
    expect(start_playing_button).toBeDisabled();

    // Type in the name of a player
    const input = screen.getByTestId("player-name");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("value", "");
    fireEvent.change(input, {target: {value: 'Foo'}})
    expect(input).toHaveAttribute("value", "Foo");

    // Check that the stage selector has the first item selected
    expect(screen.getByText("First stage")).toBeInTheDocument();

    const stage_selector = screen.getByTestId("deck-selector");
    expect(stage_selector).not.toBeEmptyDOMElement();

    // Add player
    const add_player_button = screen.getByText("Add player");
    await act(async () => {
      fireEvent.click(add_player_button);
    });

    expect(players).not.toBeEmptyDOMElement();
    expect(players).toHaveTextContent(/First stage/);
    expect(players).toHaveTextContent("❌Foo - First stage");

    expect(start_playing_button).toBeDisabled() // we need two players

    fireEvent.change(input, {target: {value: 'Bar'}})
    fireEvent.change(stage_selector, { target: { value: 1 } })
    await act(async () => {
      fireEvent.click(add_player_button);
    });
    expect(players).toHaveTextContent("❌Foo - First stage");
    expect(players).toHaveTextContent("❌Bar - Second stage");

    expect(start_playing_button).toBeEnabled();

    // TODO: when adding a player check that the name field is not empty (or just white spaces)
    // TODO: when adding a player remove spaces from around the name.
    // TODO: avoid adding two players with the same name


    // add 3rd and 4th players
    fireEvent.change(input, {target: {value: 'Third player'}});
    fireEvent.change(stage_selector, { target: { value: 0 } });
    await act(async () => {
      fireEvent.click(add_player_button);
    });

    fireEvent.change(input, {target: {value: 'Fourth player'}});
    fireEvent.change(stage_selector, { target: { value: 1 } });
    await act(async () => {
      fireEvent.click(add_player_button);
    });

    expect(players).toHaveTextContent("❌Foo - First stage");
    expect(players).toHaveTextContent("❌Bar - Second stage");
    expect(players).toHaveTextContent("❌Third player - First stage");
    expect(players).toHaveTextContent("❌Fourth player - Second stage");

    // remove a player
    const third_player = screen.getByText("Third player");

    const player_holder_div = third_player.closest("div");
    //const remove_player_button = within(player_holder_div).getByRole('button');
    const remove_player_button = within(player_holder_div).getByText("❌");
    await act(async () => {
      fireEvent.click(remove_player_button);
    });

    expect(players).toHaveTextContent("❌Foo - First stage");
    expect(players).toHaveTextContent("❌Bar - Second stage");
    expect(players).not.toHaveTextContent("❌Third player - First stage");
    expect(players).toHaveTextContent("❌Fourth player - Second stage");

    // TODO: test after removing all the players except one, the start playing button is disabled again
    // TODO: test Start playing
  });
});