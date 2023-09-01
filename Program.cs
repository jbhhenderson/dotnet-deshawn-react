using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.AspNetCore.Mvc;

List<Dog> dogs = new List<Dog>
{
    new Dog()
    {
        Id = 1,
        Name = "Coco",
        CityId = 1,
        WalkerId = 2
    },
    new Dog()
    {
        Id = 2,
        Name = "Naru",
        CityId = 1,
        WalkerId = 1
    },
    new Dog()
    {
        Id = 3,
        Name = "Piper",
        CityId = 2,
        WalkerId = 1
    },
    new Dog()
    {
        Id = 4,
        Name = "Remy",
        CityId = 3,
        WalkerId = 3
    }
};

List<City> cities = new List<City>
{
    new City()
    {
        Id = 1,
        Name = "Clarkson"
    },
    new City()
    {
        Id = 2,
        Name = "Bowling Green"
    },
    new City()
    {
        Id = 3,
        Name = "Nashville"
    },
    new City()
    {
        Id = 4,
        Name = "Owensboro"
    }
};

List<Walker> walkers = new List<Walker>
{
    new Walker()
    {
        Id = 1,
        Name = "Jackson"
    },
    new Walker()
    {
        Id = 2,
        Name = "JoNell"
    },
    new Walker()
    {
        Id = 3,
        Name = "Alex"
    }
};

List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new WalkerCity()
    {
        Id = 1,
        WalkerId = 1,
        CityId = 1
    },
    new WalkerCity()
    {
        Id = 2,
        WalkerId = 1,
        CityId = 2
    },
    new WalkerCity()
    {
        Id = 3,
        WalkerId = 1,
        CityId = 3
    },
    new WalkerCity()
    {
        Id = 4,
        WalkerId = 2,
        CityId = 1
    },
    new WalkerCity()
    {
        Id = 5,
        WalkerId = 2,
        CityId = 2
    },
    new WalkerCity()
    {
        Id = 6,
        WalkerId = 3,
        CityId = 2
    },
    new WalkerCity()
    {
        Id = 7,
        WalkerId = 3,
        CityId = 3
    },
    new WalkerCity()
    {
        Id = 8,
        WalkerId = 3,
        CityId = 4
    }
};

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("/api/dogs", () => 
{
    return dogs;
});

app.MapGet("/api/dogs/{id}", (int id) => 
{
    Dog foundDog = dogs.FirstOrDefault(d => d.Id == id);

    if(foundDog == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(foundDog);
});

app.MapPost("/api/dogs", (Dog newDog) => 
{
    newDog.Id = dogs.Count > 0 ? dogs.Max(d => d.Id) + 1 : 1;
    dogs.Add(newDog);
    return newDog;
});

app.MapGet("/api/cities", () => 
{
    return cities;
});

app.MapGet("/api/cities/{id}", (int id) => 
{
    City foundCity = cities.FirstOrDefault(fc => fc.Id == id);
    if (foundCity == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(foundCity);
});

app.MapPost("/api/cities", (City city) => 
{
    city.Id = cities.Count > 0 ? cities.Max(c => c.Id) + 1 : 1;
    cities.Add(city);
    return city;
});

app.MapGet("/api/walkers", () => 
{
    return walkers;
});

app.MapGet("/api/walkers/{cityName}", (string cityName) => 
{
    if (cityName != "0") 
    {
        City foundCity = cities.FirstOrDefault(c => c.Name == cityName);
        List<WalkerCity> filteredWalkerCities = walkerCities.Where(wc => wc.CityId == foundCity.Id).ToList();
        List<Walker> filteredWalkers = new List<Walker>();

        foreach (WalkerCity fwc in filteredWalkerCities)
        {
            Walker foundWalker = walkers.FirstOrDefault(w => w.Id == fwc.WalkerId);
            filteredWalkers.Add(foundWalker);
        }

        return Results.Ok(filteredWalkers);
    }
    else 
    {
        return Results.Ok(walkers);
    }
});

app.MapGet("/api/walker/{id}", (int id) => 
{
    Walker foundWalker = walkers.FirstOrDefault(fw => fw.Id == id);
    if (foundWalker == null)
    {
        return Results.Ok("Unassigned");
    }
    return Results.Ok(foundWalker);
});

app.MapGet("/api/walkerCities/{walkerId}", (int walkerId) =>
{
    List<WalkerCity> foundWalkerCities = walkerCities.Where(wc => wc.WalkerId == walkerId).ToList();

    List<City> foundCities = new List<City>();

    foreach(WalkerCity fwc in foundWalkerCities)
    {
        foundCities.Add(cities.FirstOrDefault(c => c.Id == fwc.CityId));
    }

    return Results.Ok(foundCities);
});

app.MapGet("/api/availableDogs/{cityId}", (int cityId) => 
{
    List<Dog> foundDogs = dogs.Where(d => d.CityId == cityId).ToList();

    return Results.Ok(foundDogs);
});

app.MapPut("/api/updateDog/{dogId}", (int dogId, Dog dog) =>
{
    Dog dogToUpdate = dogs.FirstOrDefault(d => d.Id == dogId);

    int dogIndex = dogs.IndexOf(dogToUpdate);

    dogs[dogIndex] = dog;

    return Results.Ok();
});

app.MapDelete("/api/removeDog/{dogId}", (int dogId) =>
{
    Dog dog = dogs.FirstOrDefault(d => d.Id == dogId);
    dogs.Remove(dog);
});

app.MapPut("/api/updateWalker/{walkerId}", (Walker walker) => 
{
    Walker walkerToUpdate = walkers.FirstOrDefault(w => w.Id == walker.Id);

    int walkerIndex = walkers.IndexOf(walkerToUpdate);
    walkers[walkerIndex].Name = walker.Name;

    walkerCities = walkerCities.Where(wc => wc.WalkerId != walker.Id).ToList();

    foreach (City city in walker.Cities)
    {
        WalkerCity newWC = new WalkerCity
        {
            WalkerId = walker.Id,
            CityId = city.Id
        };
        newWC.Id = walkerCities.Count > 0 ? walkerCities.Max(wc => wc.Id) + 1 : 1;
        walkerCities.Add(newWC);
    }
});

app.Run();

