const presets = [
    [
        "@babel/env",
        {
            useBuiltIns: "usage",
            corejs: 3
        }
    ]
];

const plugins = [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread"
];

module.exports = { presets, plugins };
