const path = require("path");
const fs = require("fs");
const glob = require("glob");

function PropertyReader()
{
}

PropertyReader.prototype.readFile = function(filename)
{
    const entries = {};
    const stream = new PropertyTokenStream(
        fs.readFileSync(filename, { encoding: "utf-8" })
    );

    let currentToken;
    let currentKey = null;
    let currentValue = null;
    let readValue = false;
    let isComment = false;

    while ((currentToken = stream.next()) !== null)
    {
        if (currentToken.type === PropertyTokenStream.TOKEN_ASSIGN && !isComment)
        {
            readValue = true;
        }
        else if (currentToken.type === PropertyTokenStream.TOKEN_COMMENT)
        {
            if (readValue)
            {
                entries[currentKey] = currentValue.trim();
                currentKey = null;
                currentValue = null;
                readValue = false;
            }

            isComment = true;
        }
        else if (!readValue && currentToken.type === PropertyTokenStream.TOKEN_WORD && !isComment)
        {
            currentKey = currentToken.value;
        }
        else if (readValue && currentToken.value !== null)
        {
            if (currentValue === null)
            {
                currentValue = currentToken.value;
            }
            else
            {
                currentValue += currentToken.value;
            }
        }
        else if (currentToken.type === PropertyTokenStream.TOKEN_NEWLINE)
        {
            if (readValue)
            {
                entries[currentKey] = currentValue.trim();
                currentKey = null;
                currentValue = null;
                readValue = false;
            }
            isComment = false;
        }
    }
    return entries;
};

function PropertyTokenStream(input)
{
    this.input = input;
}

PropertyTokenStream.TOKEN_NONE = 0;
PropertyTokenStream.TOKEN_COMMENT = 1;
PropertyTokenStream.TOKEN_ASSIGN = 2;
PropertyTokenStream.TOKEN_WORD = 3;
PropertyTokenStream.TOKEN_NEWLINE = 4;
PropertyTokenStream.TOKEN_WHITESPACE = 5;

PropertyTokenStream.prototype.next = function()
{
    let currentChar = "";
    let currentValue = "";
    let currentToken = PropertyTokenStream.TOKEN_NONE;

    while (this.input.length > 0)
    {
        currentChar = this.input.charAt(0);
        this.input = this.input.substring(1);

        if (currentChar === ";" && currentToken === PropertyTokenStream.TOKEN_NONE)
        {
            return {
                type: PropertyTokenStream.TOKEN_COMMENT,
                value: null
            };
        }
        if (currentChar === "=")
        {
            if (currentToken === PropertyTokenStream.TOKEN_NONE)
            {
                return {
                    type: PropertyTokenStream.TOKEN_ASSIGN,
                    value: "="
                };
            }
            else
            {
                this.input = "=" + this.input;
                return {
                    type: PropertyTokenStream.TOKEN_WORD,
                    value: currentValue
                };
            }
        }
        else if (currentChar === "\n")
        {
            if (currentToken === PropertyTokenStream.TOKEN_NONE)
            {
                return {
                    type: PropertyTokenStream.TOKEN_NEWLINE,
                    value: null
                };
            }

            this.input = "\n" + this.input;
            return {
                type: PropertyTokenStream.TOKEN_WORD,
                value: currentValue
            };

        }
        else if (currentChar === "\"")
        {
            if (currentToken === PropertyTokenStream.TOKEN_WORD)
            {
                return {
                    type: PropertyTokenStream.TOKEN_WORD,
                    value: currentValue
                };
            }

            currentToken = PropertyTokenStream.TOKEN_WORD;
            continue;

        }
        else if (/\s+/.test(currentChar))
        {
            if (currentToken === PropertyTokenStream.TOKEN_NONE)
            {
                return {
                    type: PropertyTokenStream.TOKEN_WHITESPACE,
                    value: currentChar
                };
            }

            this.input = currentChar + this.input;
            return {
                type: PropertyTokenStream.TOKEN_WORD,
                value: currentValue
            };

        }
        else
        {
            currentToken = PropertyTokenStream.TOKEN_WORD;
        }

        currentValue += currentChar;
    }

    return null;
};

const reader = new PropertyReader();

function compareProperties(de, en, filename)
{
    Object.keys(en)
        .filter(entry => !de.hasOwnProperty(entry))
        .forEach(entry => {
            console.log(entry + " is missing in resources/lang/de/" + filename)
        });

    Object.keys(de)
        .filter(entry => !en.hasOwnProperty(entry))
        .forEach(entry => {
            console.log(entry + " is missing in resources/lang/en/" + filename)
        });
}

glob.sync(path.resolve(__dirname, "../resources/lang/de/*.properties"))
    .forEach(germanPropertyFile =>
    {
        const englishPropertyFile = path.resolve(__dirname, "../resources/lang/en/", path.basename(germanPropertyFile));
        const germanProperties = reader.readFile(germanPropertyFile);
        const englishProperties = reader.readFile(englishPropertyFile);

        compareProperties(germanProperties, englishProperties, path.basename(germanPropertyFile));
    });

console.log("Done");