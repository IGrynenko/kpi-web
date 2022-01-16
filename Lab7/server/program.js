class Program {
    constructor(
        Id,
        Title,
        Description,
        Genre,
        Audience,
        Language,
        Duration,
        IsActive,
        Created
    ) {
        this.Id = Id,
        this.Title = Title,
        this.Description = Description,
        this.Genre = Genre,
        this.Audience = Audience,
        this.Language = Language,
        this.Duration = Duration,
        this.IsActive = IsActive,
        this.Created = Created
    }
}

module.exports = Program;