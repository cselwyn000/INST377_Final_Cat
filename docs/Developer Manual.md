# Developer Manual
## Introduction
#### This manual provides technical guidance for developers tasked with maintaining and extending the Cat Image Voting App. It covers setup instructions, system architecture, API endpoints, and future development considerations.

## Prerequisites
#### Ensure the following are installed on your development machine:

#### - Node.js v14+

#### - npm v6+

#### - Supabase Account

#### - Vercel Account

## Installation and Setup
### Clone the Repository:
#### git clone https://github.com/cselwyn000/cat-image-voting-app.git
#### cd cat-voting-simulator

### Install Dependencies:
#### npm install

### Configure Environment Variables:
#### SUPABASE_URL=your-supabase-url
#### SUPABASE_ANON_KEY=your-supabase-anon-key

### Run the Application Locally:
#### npm run dev
##### Access the application at http://localhost:3000.

## Deployment

### Install Vercel CLI:
#### npm install -g vercel

### Login to Vercel:
#### vercel login

### Deploy the Application:
#### vercel

Follow the prompts to complete the deployment. Vercel will provide a live URL upon successful deployment.

## Testing
### Currently there are no tests implemented.

## API Endpoints

### GET /api/cats
Description: Retrieves a list of cat images from the Supabase database.

#### esponse:

[
  {
    "id": 1,
    "image_url": "https://example.com/cat1.jpg",
    "votes": 5
  },
  {
    "id": 2,
    "image_url": "https://example.com/cat2.jpg",
    "votes": 3
  }
]

### POST /api/vote
Description: Increments the vote count for a specific cat image.

#### Request Body:

{
  "id": 1
}

#### Response:

{
  "success": true
}

## Supabase Database Setup
### Create a Table:

create table cats (
  id bigint generated always as identity primary key,
  image_url text not null,
  votes integer default 0
);

### Insert Sample Data:

insert into cats (image_url) values

('https://cataas.com/cat/says/Hello'),
('https://cataas.com/cat/says/World'),
('https://cataas.com/cat/says/Meow');

### Create vote function

create or replace function increment_vote(cat_id bigint)

returns void as $$
begin
  update cats set votes = votes + 1 where id = cat_id;
end;
language plpgsql;

### Enable Row-Level Security (RLS):

alter table cats enable row level security;

### Create Policies:
create policy "Allow read access" on cats
for select using (true);

create policy "Allow vote increment" on cats
for update using (true);


### Known Issues and Future Roadmap
#### Known Issues
##### No Authentication: The application lacks user authentication, allowing unlimited voting from the same user.

##### No Rate Limiting: There's no mechanism to prevent rapid consecutive votes from the same user.

##### Limited Error Handling: The application does not have any feedback or error handling mechanisms. 

### Future Enhancements
#### Integrate user authentication to track individual user votes.

#### Add rate limiting to prevent abuse by limiting the number of votes per user/IP.

#### Add Testing for a better user experience