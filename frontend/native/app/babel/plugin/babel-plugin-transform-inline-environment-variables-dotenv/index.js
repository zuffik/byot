const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const suffixes = [
    '.local',
    '',
    '.common',
    '.shared'
];
const envFiles = suffixes.map(suffix => path.join(process.cwd(), `.env${suffix}`)).filter(f => fs.existsSync(f));
const env = envFiles.reverse().reduce((prev, p) => ({
    ...prev,
    ...dotenv.config({
        path: p
    }).parsed
}), {});

module.exports = function({ types: t }) {
    function isLeftSideOfAssignmentExpression(path) {
        return (
            t.isAssignmentExpression(path.parent) && path.parent.left === path.node
        );
    }
    return {
        name: "transform-inline-environment-variables",
        visitor: {
            MemberExpression(path, { opts: { include, exclude } = {} }) {
                if (path.get("object").matchesPattern("process.env")) {
                    const key = path.toComputedKey();
                    if (
                        t.isStringLiteral(key) &&
                        !isLeftSideOfAssignmentExpression(path) &&
                        (!include || include.indexOf(key.value) !== -1) &&
                        (!exclude || exclude.indexOf(key.value) === -1)
                    ) {
                        path.replaceWith(t.valueToNode(env[key.value] || process.env[key.value]));
                    }
                }
            }
        }
    };
};
