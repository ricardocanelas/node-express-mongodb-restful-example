import seeder from 'mongoose-seed'
import config from './config'

// Connect to MongoDB via Mongoose
seeder.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true },
    function() {
        // Load Mongoose models
        seeder.loadModels(['src/models/user.js', 'src/models/post.js'])

        // Clear specified collections
        seeder.clearModels(['User', 'Post'], function() {
            // Callback to populate DB once collections have been cleared
            seeder.populateModels(data, function() {
                seeder.disconnect()
            })
        })
    }
)

// Data array containing seed data - documents organized by Model
var data = [
    {
        model: 'User',
        documents: [
            {
                name: 'Ricardo',
                email: 'ricardo@mymail.com',
                role: 'admin',
                salt: 'a322d4848c8e85328535e4bcd5551776',
                hash:
                    'f8876c20a4f55fc1d8f8a010ec5fc7be31a6bebc034188e503eec692861d3273016ea008da75a65286ddffd0af7f9f2052c29f5445173105417f58d738e06dfc5d17e2e4e877de34bc4cd31950b5eb9a85eeaaa603e69c36fa5455592e6faf146403f8e4cb7ece08db3f35ae5b8409999d16a3410a5b1f0853c4a397f9d58d193b7316efe2320af974628f5f32f65c1e9bb49ffd93de4923676c926abb57ecb4fd1f06c778af0ca29b88d76f667c514f42b0382d281d1c1a85950ca7b7ad08ccf7b6dfca8eafe8208e0202432a6a73447cfcd3ec241bc55952516b92ec905d10a6b5d360e90a6aa3640e66099f496833968f7e40e6bf41c601c04fc6bdc67dd6fea0b1aa2af084d9b0f2638ea9b8ccf90e7f65a550b4d6de58d368cde91f642f5dbdc52ed8bc67e1530da65500ca742e162c34d7e6dc8d10b03baae719983957bab4f1877f2c5487aecce6426000573554c7b8858b68884a0f4ab459d9e76d48e6e932d6bbf5c63a983b5d310b3a8915f817544bdb47ed4ad2f0d32770b7c80e201a4f57d592ef8d2264160c2fddba14c5f434cf4a30e5dca1ebe9da35c7702d25c432b58b67b6cd590cd6f2aea1930c4a9ce81a5f5b2faa93d2013b05786271cb48109f9928848b577c173ec8e9cf3b689c309f5b76cea64e3385f8df7280ff507fc436cc9d200a68763d3ea50ed1c947b7fd2f75aff5cfeb8ba78fc61f2be4',
                created_at: '2018-12-05 17:18:00.430',
                updated_at: '2018-12-05 17:18:00.430',
                status: true,
            },
        ],
    },
    {
        model: 'Post',
        documents: [
            {
                title: '25 Node JS Tutorials',
                body:
                    'This article highlights 25 Node JS tutorials written by CodeBurst authors. Whether you’re brand new to Node, or an experienced developer, there’s something here for everyone.',
                author: 'Brandon',
                created_at: '2018-12-05 17:18:00.430',
                updated_at: '2018-12-05 17:18:00.430',
                status: true,
            },
            {
                title: 'Node.JS — Best of 2018',
                body: 'A collection of popular Node JS Articles and Tutorials on Codeburst in 2018',
                author: 'Marolli',
                created_at: '2018-12-05 18:08:00.430',
                updated_at: '2018-12-05 18:08:00.430',
                status: true,
            },
        ],
    },
]
