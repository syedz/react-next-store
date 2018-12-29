const Mutations = {
    createDog(parent, args, ctx, info) {
        // Create a dog!
        const newDog = { name: args.name };
        return newDog;
    }
};

module.exports = Mutations;
