import {render, fireEvent, getByRole} from "@testing-library/react";
import Home from "@/app/page";

describe('Home Component', () => {
    it( 'Adds a node when the add button is clicked', () => {
        const {getByText, getByTestId} = render(<Home/>);
        const addButton = getByText('+');
        fireEvent.click(addButton);
        const nodeCountElement = getByText(/# of Nodes: \d+/);
        expect(nodeCountElement.textContent).toMatch(/# of Nodes: 1/);
    })
    it('removes a node when the remove button is clicked', () => {
        const { getByText } = render(<Home />);
        const addButton = getByText('+');
        fireEvent.click(addButton);
        const removeButton = getByText('-');
        fireEvent.click(removeButton);
        const nodeCountElement = getByText(/# of Nodes: \d+/);
        expect(nodeCountElement.textContent).toMatch(/# of Nodes: 0/);
    });
    it('toggles edge mode when the toggle button is clicked', () => {
        const { getByText } = render(<Home />);
        const toggleButton = getByText('⇄');
        fireEvent.click(toggleButton);
        // Assert edge mode is activated
        expect(getByText('Edge Mode Activated: Please select two nodes to connect.')).toBeDefined();
    });
})
