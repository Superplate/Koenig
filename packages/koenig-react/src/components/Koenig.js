import * as React from 'react';
import {Editor, Container, Toolbar} from 'react-mobiledoc-editor';
import DEFAULT_ATOMS from '../atoms';
import DEFAULT_KEY_COMMANDS from '../key-commands';
import DEFAULT_TEXT_EXPANSIONS from '../text-expansions';

const Koenig = ({
    mobiledoc,
    atoms = DEFAULT_ATOMS,
    keyCommands = DEFAULT_KEY_COMMANDS,
    textExpansions = DEFAULT_TEXT_EXPANSIONS,
    didCreateEditor,
    onChange
}) => {
    function _didCreateEditor(editor) {
        if (keyCommands?.length) {
            keyCommands.forEach((command) => {
                editor.registerKeyCommand({
                    str: command.str,
                    run() {
                        return command.run(editor);
                    }
                });
            });
        }

        if (textExpansions?.length) {
            textExpansions.forEach((textExpansion) => {
                textExpansion.unregister?.forEach(key => editor.unregisterTextInputHandler(key));
                textExpansion.register?.forEach(expansion => editor.onTextInput(expansion));
            });
        }

        didCreateEditor?.(editor);
    }

    return (
        <Container
            className="md:mx-auto md:py-16 max-w-xl w-full"
            mobiledoc={mobiledoc}
            atoms={atoms}
            onChange={onChange}
            didCreateEditor={_didCreateEditor}
        >
            <Toolbar className="flex" />
            <Editor className="prose"/>
        </Container>
    );
};

export default Koenig;
