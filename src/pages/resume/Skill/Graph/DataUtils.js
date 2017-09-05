export function createTreeStruct(idRoot, ...arrays) {
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
            const enrichedData = Object.assign({
                type: 'skill',
                parent: idRoot,
            }, (typeof skill === 'object') ? skill : {});

            return Object.assign({}, enrichedData, e);
        });
        treeStruct.push(...enrichedElements);
    });
    return treeStruct;
}
