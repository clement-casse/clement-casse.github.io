/**
 * This functions return an array of skills and domains with the parent field
 * calculated from the fields 'RelatedSkills' and 'RelatedDomains'.
 * It requires, as first argument, the ID of the root of the tree. All other arguments
 * are arrays that are merged together
 * @param {string} idRoot ID of the root element of the tree
 * @param {Object[]} arrays Arrays of objects with the properties 'id' and linking
 * children with the properties "relatedDomains" or "relatedSkills".
 */
function createTreeStruct(idRoot, ...arrays) {
    const data = [].concat(...arrays);
    const root = data.find(d => d.id === idRoot);
    if (typeof root === 'undefined') {
        throw new Error(`Root ID not found: ${idRoot}`);
    }

    const treeStruct = [root];

    if (!Object.prototype.hasOwnProperty.call(root, 'relatedDomains')) {
        root.relatedDomains = [];
    }

    //
    root.relatedDomains.forEach((domain) => {
        const subRoot = (typeof domain === 'object') ? domain.id : domain;
        const newElements = this.createTreeStruct(subRoot, data);

        const enrichedElements = newElements.map((e) => {
            const enrichedData = {
                type: 'domain',
                parent: idRoot,
            };
            return Object.assign({}, enrichedData, e);
        });
        treeStruct.push(...enrichedElements);
    });

    if (!Object.prototype.hasOwnProperty.call(root, 'relatedSkills')) {
        root.relatedSkills = [];
    }

    //
    root.relatedSkills.forEach((skill) => {
        const subRoot = (typeof skill === 'object') ? skill.id : skill;
        const newElements = this.createTreeStruct(subRoot, data);

        const enrichedElements = newElements.map((e) => {
            // Enrich with the fields : type, parent, and all other fields provided
            // within the key relatedSkills
            const enrichedData = {
                type: 'skill',
                parent: idRoot,
            };
            // terrible hack to extend skills with 'weight' attribute e.g.
            if (e.id === skill.id) {
                Object.assign(enrichedData, skill);
            }
            // end of big shame
            return Object.assign({}, enrichedData, e);
        });
        treeStruct.push(...enrichedElements);
    });
    return treeStruct;
}

/**
 * 
 */
function currentlyUseless() {
    return 'definitly usesless';
}

export { createTreeStruct, currentlyUseless };
