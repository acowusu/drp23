BEGIN;
-- Clear the old data
DELETE FROM eventTags WHERE 1=1;
DELETE FROM tags WHERE 1=1;
DELETE FROM attending WHERE 1=1;
DELETE FROM events WHERE 1=1;
DELETE FROM subscription WHERE 1=1;
DELETE FROM society WHERE 1=1;
DELETE FROM users WHERE 1=1;

-- IF type_id('testing_db.public.societytype') IS NOT NULL
--         DROP TYPE testing_db.public.societytype;

-- Inserting data into the tags table
INSERT INTO tags (tag_id, tag_name) VALUES
    ('ffffffff-ffff-ffff-ffff-fffffffffff1','Music'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff2','Sports'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff3','Art'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff4','Food'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff5','Technology'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff6' ,'Academic Related'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff7' ,'Arts & Entertainment'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff8' ,'Charitable'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff9' ,'Cultural'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff10' ,'Departmental'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff11' ,'Faith'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff12' ,'Indoor'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff13' ,'Martial Arts'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff14' ,'Media'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff15' ,'Outdoor'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff16' ,'Social'),
    ('ffffffff-ffff-ffff-ffff-ffffffffff17' ,'Sports');

-- Inserting data into the events table
INSERT INTO events (event_id, name, description, image_url, society, location, date_time, ticket_price, latitude, longitude) VALUES
    ( 'ffffffff-ffff-ffff-ffff-fffffffffff1' , 'Concert in the Park', 'Join us for a live music concert in the park', 'https://picsum.photos/seed/concert/1920/1080', 'Jazz, Soul and Funk', 'Central Park', '2023-06-15 19:30:00', 25.99, 40.7829, -73.9654),
    ( 'ffffffff-ffff-ffff-ffff-fffffffffff2' , 'Football Tournament', 'Participate in the annual football tournament', 'https://picsum.photos/seed/football/1920/1080', 'Football - Mens', 'City Stadium', '2023-07-10 10:00:00', 10.00, 40.7128, -74.0060),
    ( 'ffffffff-ffff-ffff-ffff-fffffffffff3' , 'Art Exhibition', 'Explore a collection of contemporary art', 'https://picsum.photos/seed/art/1920/1080', 'Art Club', 'Gallery XYZ', '2023-06-30 14:00:00', 5.99, 40.7406, -73.9903),
    ( 'ffffffff-ffff-ffff-ffff-fffffffffff4' , 'Food Festival', 'Experience a variety of culinary delights', 'https://picsum.photos/seed/food/1920/1080', 'International Foodies Society', 'Town Square', '2023-07-22 12:00:00', 0.00, 40.7589, -73.9851),
    ( 'ffffffff-ffff-ffff-ffff-fffffffffff5' , 'Tech Conference', 'Learn about the latest advancements in technology


    
    Welcome to the cutting-edge world of technology! Join us at the Tech Innovators Conference, where we bring together the brightest minds, industry leaders, and tech enthusiasts from around the globe. Prepare to embark on an unforgettable journey of discovery, collaboration, and inspiration.

At the Tech Innovators Conference, we aim to ignite your imagination and empower you with the latest trends, breakthroughs, and innovations in the ever-evolving tech landscape. Our conference is a melting pot of ideas, where attendees can explore the frontiers of technology and shape the future together.

Immerse yourself in a captivating atmosphere buzzing with excitement and anticipation. From the moment you step foot into the conference venue, you''ll be greeted by state-of-the-art displays, interactive exhibits, and futuristic installations that showcase the limitless possibilities of technology. Experience firsthand the transformative power of virtual reality, augmented reality, robotics, artificial intelligence, blockchain, and much more.

Our agenda is carefully crafted to cater to diverse interests and expertise. Engage in thought-provoking keynote presentations by visionaries who have revolutionized industries and reshaped the world we live in. Get up close and personal with experts during interactive panel discussions, fireside chats, and workshops, where you can delve into the nitty-gritty of emerging technologies, best practices, and successful implementation strategies.

The Tech Innovators Conference provides a vibrant platform for networking and forging meaningful connections. Connect with industry leaders, entrepreneurs, investors, and innovators during dedicated networking sessions, where you can share ideas, explore potential collaborations, and build invaluable relationships that may shape your future endeavors.', 'https://picsum.photos/seed/tech/1920/1080', 'Computing', 'Conference Center', '2023-08-05 09:00:00', 50.00, 40.7282, -74.0776);

-- Inserting data into the eventTags table
INSERT INTO eventTags (event_id, tag_id) VALUES
    ('ffffffff-ffff-ffff-ffff-fffffffffff1', 'ffffffff-ffff-ffff-ffff-fffffffffff1'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff2', 'ffffffff-ffff-ffff-ffff-fffffffffff2'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff3', 'ffffffff-ffff-ffff-ffff-fffffffffff3'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff4', 'ffffffff-ffff-ffff-ffff-fffffffffff4'),
    ('ffffffff-ffff-ffff-ffff-fffffffffff5', 'ffffffff-ffff-ffff-ffff-fffffffffff5');

-- INSERT INTO society (name, type) VALUES
--     ('93% Club Imperial', 'Charitable')      ,
--     ('A Cappella','Arts & Entertainment'),
--     ('ABACUS','Cultural'),
--     ('Acute Care Specialities ','Academic Related'),
--     ('Aeronautics','Departmental'),
--     ('Afghan Society','Cultural'),
--     ('African Caribbean','Cultural'),
--     ('Ahlul Bayt','Faith'),
--     ('Ahmadiyya Muslim Students Association','Faith'),
--     ('AIESEC in Imperial','Academic Related'),
--     ('Algorithmic Trading','Academic Related'),
--     ('Alternative Music','Arts & Entertainment'),
--     ('Alternative Protein','Academic Related'),
--     ('American Football','Sports'),
--     ('Anglo French Medical','Academic Related'),
--     ('AnimeSoc','Social'),
--     ('Arabic','Cultural'),
--     ('Archery','Sports'),
--     ('Argentine Tango','Arts & Entertainment'),
--     ('Art Club','Arts & Entertainment'),
--     ('Artsoc','Arts & Entertainment'),
--     ('Asian Medical Students Association','Academic Related'),
--     ('Astronomy','Outdoor'),
--     ('Australian','Cultural'),
--     ('Badminton','Sports'),
--     ('Badminton (ICSM)','Sports'),
--     ('Badminton (RSM)','Sports'),
--     ('Baking','Social'),
--     ('Bangladeshi','Cultural'),
--     ('Barbell','Sports'),
--     ('Baseball and Softball','Sports'),
--     ('Basketball','Sports'),
--     ('Beekeeping (Silwood)','Outdoor'),
--     ('Believers Loveworld','Faith'),
--     ('Benelux Society','Cultural'),
--     ('Beyond','Social'),
--     ('Big Band','Arts & Entertainment'),
--     ('Bike Users Group','Charitable'),
--     ('Bio Engineering','Departmental'),
--     ('Biochemistry','Departmental'),
--     ('Biology','Departmental'),
--     ('BioMedical','Departmental'),
--     ('Bioscience Review','Academic Related'),
--     ('Blockchain','Academic Related'),
--     ('Boat','Sports'),
--     ('Boat (ICSM)','Sports'),
--     ('Book','Social'),
--     ('Botanical','Social'),
--     ('Boxing','Sports'),
--     ('Brewing (Silwood)','Indoor'),
--     ('Bridge','Indoor'),
--     ('Buddhist','Faith'),
--     ('Bulgarian','Cultural'),
--     ('Callisthenics','Sports'),
--     ('Cameroon Catalyst','Charitable'),
--     ('Canadian Society','Cultural'),
--     ('Canoe','Outdoor'),
--     ('Cardiovascular','Academic Related'),
--     ('Catholic','Faith'),
--     ('Caving','Outdoor'),
--     ('Chamber Choir','Arts & Entertainment'),
--     ('Chamber Music','Arts & Entertainment'),
--     ('Cheerleading','Sports'),
--     ('Chemical Engineering','Departmental'),
--     ('Chemistry','Departmental'),
--     ('Chess','Indoor'),
--     ('Chickens (Silwood)','Outdoor'),
--     ('Chinese','Cultural'),
--     ('Chinese Students & Scholars Association','Cultural'),
--     ('Choir','Arts & Entertainment'),
--     ('Christian Medical Fellowship','Academic Related'),
--     ('Christian Union','Faith'),
--     ('Cinema','Arts & Entertainment'),
--     ('Civil Engineering','Departmental'),
--     ('Climate Entrepreneurs','Social'),
--     ('Clinical Genetics','Academic Related'),
--     ('Coding (ICSM)','Academic Related'),
--     ('Comedy Society','Arts & Entertainment'),
--     ('Computational Biology','Academic Related'),
--     ('Computing','Departmental'),
--     ('Connect','Academic Related'),
--     ('Conservative','Social'),
--     ('Consultancy','Social'),
--     ('Cricket','Sports'),
--     ('Cricket (ICSM)','Sports'),
--     ('Cross Country & Athletics','Sports'),
--     ('Cycle Club (ICSM)','Sports'),
--     ('Cycling','Sports'),
--     ('Cypriot','Cultural'),
--     ('Czech & Slovak','Cultural'),
--     ('Dance - Funkology','Arts & Entertainment'),
--     ('Dance (ICSM)','Arts & Entertainment'),
--     ('Dance Club','Arts & Entertainment'),
--     ('Dance Company','Arts & Entertainment'),
--     ('Data Science','Academic Related'),
--     ('Debating','Social'),
--     ('Dermatology (ICSM)','Academic Related'),
--     ('Design Engineering','Departmental'),
--     ('DJ & Production','Arts & Entertainment'),
--     ('Doctorpreneurs','Academic Related'),
--     ('Dodgeball','Sports'),
--     ('DogSoc','Social'),
--     ('Drama (ICSM)','Arts & Entertainment'),
--     ('DramSoc','Arts & Entertainment'),
--     ('DroneSoc','Academic Related'),
--     ('E.quinox','Charitable'),
--     ('East African','Cultural'),
--     ('Effective Altruism','Academic Related'),
--     ('Egyptian Society','Cultural'),
--     ('Electrical Engineering','Departmental'),
--     ('Enactus','Charitable'),
--     ('Endocrinology','Academic Related'),
--     ('Energy','Social'),
--     ('Engineering Change','Charitable'),
--     ('Engineers Without Borders UK','Academic Related'),
--     ('Entrepreneurs','Social'),
--     ('Environmental','Social'),
--     ('Erasmus','Cultural'),
--     ('Estonian','Cultural'),
--     ('Every Nation Christian','Faith'),
--     ('Fashion & Design','Arts & Entertainment'),
--     ('Felix','Media'),
--     ('Fellwanderers (Imperial Hiking Society)','Outdoor'),
--     ('Feminist','Social'),
--     ('FemTech','Academic Related'),
--     ('Fencing','Sports'),
--     ('Filipino Society','Cultural'),
--     ('Filmsoc','Arts & Entertainment'),
--     ('Finance','Social'),
--     ('FinTech','Social'),
--     ('First Aid','Charitable'),
--     ('First Love','Faith'),
--     ('Floorball','Sports'),
--     ('Football - Mens','Sports'),
--     ('Football - Mens (ICSM)','Sports'),
--     ('Football - Mens (RSM)','Sports'),
--     ('Football - Womens','Sports'),
--     ('Football - Womens (ICSM)','Sports'),
--     ('Football - Womens (RSM)','Sports'),
--     ('Formula 1','Sports'),
--     ('French','Cultural'),
--     ('Friends of Médecins Sans Frontières','Charitable'),
--     ('Friends of Palestine','Cultural'),
--     ('Game Development','Indoor'),
--     ('Gaming and E=sports','Indoor'),
--     ('Gardening (Silwood)','Outdoor'),
--     ('Gastroenterology & Hepatology ','Academic Related'),
--     ('Gazette','Media'),
--     ('General Practice (ICSM)','Academic Related'),
--     ('Geology','Departmental'),
--     ('Geology for Global Development','Academic Related'),
--     ('Geophysics','Departmental'),
--     ('Geriatrics and Elderly Medicine','Academic Related'),
--     ('German','Cultural'),
--     ('Gliding','Outdoor'),
--     ('Global Brigades','Charitable'),
--     ('Golf','Sports'),
--     ('Golf (ICSM)','Sports'),
--     ('Gospel Choir','Arts & Entertainment'),
--     ('GradMed (ICSM)','Departmental'),
--     ('Graduate Biotechnology Hub','Academic Related'),
--     ('Haematology Society','Academic Related'),
--     ('Hammersmith Students Community','Social'),
--     ('Handball','Sports'),
--     ('Harry Potter Society','Social'),
--     ('Healthcare Leadership','Academic Related'),
--     ('Hellenic','Cultural'),
--     ('Hindu Society','Faith'),
--     ('Hip Hop Society','Arts & Entertainment'),
--     ('History','Social'),
--     ('Hockey','Sports'),
--     ('Hockey (RSM)','Sports'),
--     ('Hockey Mens (ICSM)','Sports'),
--     ('Hockey Womens (ICSM)','Sports'),
--     ('Hungarian','Cultural'),
--     ('Ice Hockey','Sports'),
--     ('Immunology','Academic Related'),
--     ('Imperial College Aid to the Balkans','Charitable'),
--     ('Imperial College Telugu Society','Cultural'),
--     ('Imperial Cubing League','Social'),
--     ('Imperial Marrow ','Charitable'),
--     ('Imperial Medical Womens Federation (MWF) Society ','Academic Related'),
--     ('Imperial Virtual and Augmented Reality ','Academic Related'),
--     ('Indian','Cultural'),
--     ('Indian National Student Association','Academic Related'),
--     ('Indonesian','Cultural'),
--     ('Infectious Diseases Society','Academic Related'),
--     ('International Foodies Society','Social'),
--     ('International Tamil','Cultural'),
--     ('Investment','Social'),
--     ('IQ (Imperial College LGBT+)','Social'),
--     ('Iraqi','Cultural'),
--     ('Irish','Cultural'),
--     ('Islamic','Faith'),
--     ('Israeli','Cultural'),
--     ('Italian','Cultural'),
--     ('Jain','Faith'),
--     ('Japanese','Cultural'),
--     ('Jazz, Soul and Funk','Arts & Entertainment'),
--     ('Jewish','Faith'),
--     ('Jiu Jitsu (Aiuchi)','Martial Arts'),
--     ('Judo','Martial Arts'),
--     ('Ju-Jitsu','Martial Arts'),
--     ('Junior Solutions','Academic Related'),
--     ('K Pop Society','Arts & Entertainment'),
--     ('Kabaddi','Sports'),
--     ('Karate','Martial Arts'),
--     ('Kendo','Martial Arts'),
--     ('Kinky Klub','Social'),
--     ('KnitSock','Indoor'),
--     ('Korean','Cultural'),
--     ('Krav Society','Martial Arts'),
--     ('Krishna Consciousness','Faith'),
--     ('Kung Fu','Martial Arts'),
--     ('Labour','Social'),
--     ('Lacrosse','Sports'),
--     ('Latin-American','Cultural'),
--     ('Law','Social'),
--     ('Lebanese','Cultural'),
--     ('Left Forum','Social'),
--     ('Liberty in North Korea','Charitable'),
--     ('Lifestyle Medicine and Prevention ','Academic Related'),
--     ('Light Opera (ICSM)','Arts & Entertainment'),
--     ('Live Music','Arts & Entertainment'),
--     ('Mahjong','Indoor'),
--     ('Malaysian','Cultural'),
--     ('Management','Social'),
--     ('Marxist','Social'),
--     ('Materials','Departmental'),
--     ('Mathematics','Departmental'),
--     ('Mauritian','Cultural'),
--     ('Mechanical Engineering','Departmental'),
--     ('Medical Education','Departmental'),
--     ('Medical Humanities','Academic Related'),
--     ('MedTech','Academic Related'),
--     ('Mentality','Charitable'),
--     ('Mindfulness','Social'),
--     ('Model United Nations','Social'),
--     ('Moroccan','Cultural'),
--     ('Motor (C&G)','Outdoor'),
--     ('Motor (RSM)','Outdoor'),
--     ('Mountaineering','Outdoor'),
--     ('Muay Thai','Martial Arts'),
--     ('Music (ICSM)','Arts & Entertainment'),
--     ('Musical Theatre','Arts & Entertainment'),
--     ('Muslim Medics','Social'),
--     ('Nepali Society','Cultural'),
--     ('Netball','Sports'),
--     ('Netball (ICSM)','Sports'),
--     ('Netball (RSM)','Sports'),
--     ('Neuroscience','Academic Related'),
--     ('Neurosurgical','Academic Related'),
--     ('Nigerian','Cultural'),
--     ('Northern Society','Cultural'),
--     ('Nutritank','Academic Related'),
--     ('Obstetrics & Gynaecology','Academic Related'),
--     ('Oil and Gas Forum','Academic Related'),
--     ('Oncology','Academic Related'),
--     ('Ophthalmology','Academic Related'),
--     ('Orchestra - Sinfonietta','Arts & Entertainment'),
--     ('Orchestra - Symphony','Arts & Entertainment'),
--     ('Origami','Arts & Entertainment'),
--     ('Otoscope','Academic Related'),
--     ('Outdoor','Outdoor'),
--     ('Overseas Christian Fellowship','Faith'),
--     ('Padel','Sports'),
--     ('Paediatrics','Academic Related'),
--     ('Pakistan','Cultural'),
--     ('Parkour, Free Running and Gymnastics','Sports'),
--     ('PASS','Social'),
--     ('Pathology','Academic Related'),
--     ('Personalised Medicine','Academic Related'),
--     ('Pharmacology','Academic Related'),
--     ('Photosoc','Media'),
--     ('Physics','Departmental'),
--     ('Physiology','Academic Related'),
--     ('Pilots','Outdoor'),
--     ('Pint of Science','Academic Related'),
--     ('Plastic Surgery','Departmental'),
--     ('Poetry','Arts & Entertainment'),
--     ('Pokemon','Social'),
--     ('Poker','Indoor'),
--     ('Pole & Aerial','Sports'),
--     ('Polish','Cultural'),
--     ('Portuguese Speaking','Cultural'),
--     ('Pre-Hospital Emergency Medicine','Academic Related'),
--     ('Project Nepal','Charitable'),
--     ('Prosthetics','Academic Related'),
--     ('Psychedelic Studies','Academic Related'),
--     ('Psychiatry','Academic Related'),
--     ('Punjabi','Cultural'),
--     ('Qazaq','Cultural'),
--     ('Quantum Technology','Academic Related'),
--     ('Quiz','Social'),
--     ('Racing','Outdoor'),
--     ('Radio','Media'),
--     ('Radiology Society','Academic Related'),
--     ('RAG','Charitable'),
--     ('RAG (ICSM)','Charitable'),
--     ('Rail and Transport','Outdoor'),
--     ('Raincatcher Imperial','Charitable'),
--     ('RCS Motor Club','Outdoor'),
--     ('Real Ale','Social'),
--     ('RED Project Borneo','Charitable'),
--     ('Renal and Urology','Academic Related'),
--     ('Respiratory Medicine','Academic Related'),
--     ('Retail Hospitality FMCG','Social'),
--     ('Riding & Polo','Sports'),
--     ('Rifle & Pistol','Sports'),
--     ('Right to Play','Charitable'),
--     ('Robotics','Indoor'),
--     ('Robotics Academy','Charitable'),
--     ('Rock and Metal','Arts & Entertainment'),
--     ('Romanian','Cultural'),
--     ('Roundnet','Sports'),
--     ('Rugby - Mens','Sports'),
--     ('Rugby - Mens (Imperial Medicals)','Sports'),
--     ('Rugby - Mens (RSM)','Sports'),
--     ('Rugby - Womens','Sports'),
--     ('Russian Speaking','Cultural'),
--     ('Sailing','Sports'),
--     ('Saudi','Cultural'),
--     ('Scandinavian','Cultural'),
--     ('Science Fiction and Fantasy','Social'),
--     ('SCUBA (Underwater) Club','Outdoor'),
--     ('Sea Shanty','Arts & Entertainment'),
--     ('Sensible Drug Policy','Social'),
--     ('Sexpression','Charitable'),
--     ('Shaolin Kung-Fu','Martial Arts'),
--     ('Shorinji Kempo','Martial Arts'),
--     ('Sign Language','Social'),
--     ('Sikh','Faith'),
--     ('Singapore','Cultural'),
--     ('Skate Society','Outdoor'),
--     ('Skydiving','Outdoor'),
--     ('Snooker & Pool','Sports'),
--     ('Snowsports','Sports'),
--     ('Society of Fire Protection Engineers','Academic Related'),
--     ('Society of Research and Academia','Academic Related'),
--     ('Somali Society','Cultural'),
--     ('Soup Run','Charitable'),
--     ('South Asian Society','Cultural'),
--     ('Space Society','Academic Related'),
--     ('Spanish','Cultural'),
--     ('Speakers','Social'),
--     ('Sports & Exercise Medicine','Academic Related'),
--     ('Sports (Silwood)','Sports'),
--     ('Squash','Sports'),
--     ('Squash (ICSM)','Sports'),
--     ('Sri Lankan','Cultural'),
--     ('Street Doctors','Academic Related'),
--     ('String Ensemble','Arts & Entertainment'),
--     ('Student Action for Refugees','Charitable'),
--     ('Students for Global Health','Academic Related'),
--     ('Surf','Outdoor'),
--     ('Surgical','Academic Related'),
--     ('SwiftSoc','Media'),
--     ('Swim and Waterpolo','Sports'),
--     ('Swiss','Cultural'),
--     ('Synchronized Swimming','Sports'),
--     ('Synthetic Biology','Academic Related'),
--     ('Table Tennis','Sports'),
--     ('Tabletop Gaming','Indoor'),
--     ('Taekwondo','Martial Arts'),
--     ('Taiwan','Cultural'),
--     ('Tea','Social'),
--     ('Team Bo','Outdoor'),
--     ('TeddyBear Hospital','Academic Related'),
--     ('TedX','Charitable'),
--     ('Tennis','Sports'),
--     ('Tennis (ICSM)','Sports'),
--     ('Tennis (RSM)','Sports'),
--     ('Thai','Cultural'),
--     ('The Breast Project Imperial','Charitable'),
--     ('Triathlon','Sports'),
--     ('Turkish','Cultural'),
--     ('Ukrainian','Cultural'),
--     ('Ultimate Frisbee','Sports'),
--     ('Underwater Hockey','Sports'),
--     ('UNICEF','Charitable'),
--     ('USA Society','Cultural'),
--     ('VegSoc','Social'),
--     ('Vehicle Design','Academic Related'),
--     ('Venture Capital & Private Equity','Departmental'),
--     ('Vietnamese','Cultural'),
--     ('Vision','Charitable'),
--     ('Volleyball','Sports'),
--     ('Wakeboarding','Outdoor'),
--     ('Water Polo (ICSM)','Sports'),
--     ('Weights & Fitness (ICSM)','Sports'),
--     ('Welsh Society','Cultural'),
--     ('Wiki Project','Academic Related'),
--     ('Wind Band','Arts & Entertainment'),
--     ('Windsurfing','Sports'),
--     ('Wing Chun','Martial Arts'),
--     ('Women in Business','Academic Related'),
--     ('Women in Healthcare Leadership','Academic Related'),
--     ('Women in SET','Charitable'),
--     ('Writers Society','Social'),
--     ('Wushu','Martial Arts'),
--     ('Yacht','Sports'),
--     ('Yoga','Indoor'),
--     ('Yoga (ICSM)','Indoor');

COMMIT;


