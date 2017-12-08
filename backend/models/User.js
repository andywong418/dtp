const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    facebookId: String,
    birthday: Date,
    location: {
        lat: Number,
        lng: Number
    },
    hometown: String,
    languages: [String],
    education: [{}],
    mainInterests: [String],
    nonSpecificInterests: [String],
    peopleMet: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    },
    streak: {
        type: Number,
        default: 0
    },
    rooms: {},
    profilePic: String,
    photos: [{}],
    friends: [{}],
    purpose: String,
    profileComplete: Boolean
})

UserSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
