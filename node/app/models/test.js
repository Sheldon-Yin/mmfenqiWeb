/**
 * Created by sheldon on 2016/6/13.
 */
var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var personSchema = Schema({
	_id     : Number,
	name    : String,
	age     : Number,
	stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});
var storySchema = Schema({
	_creator : { type: Number, ref: 'Person' },
	title    : String,
	fans     : [{ type: Number, ref: 'Person' }]
});
var Story  = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);

var _story;

Story
	.findOne({ title: /timex/i })
	.populate('_creator', 'name') // only return the Persons name
	.exec(function (err, story) {
		if (err) return console.log(err);

		_story = story;


		var guille = new Person({ name: 'Guillermo',_id:1 });
		guille.save(function (err) {
			if (err) return console.log(err);

			_story._creator = guille;
			console.log(_story._creator.name);
			// prints "Guillermo" in mongoose >= 3.6
			// see https://github.com/LearnBoost/mongoose/wiki/3.6-release-notes

			_story.save(function (err) {
				if (err) return handleError(err);

				Story
					.findOne({ title: /timex/i })
					.populate({ path: '_creator', select: 'name' })
					.exec(function (err, story) {
						if (err) return handleError(err);

						console.log('The creator is %s', story._creator.name);
						// prints "The creator is Guillermo"
					})
			})
		})

	});

