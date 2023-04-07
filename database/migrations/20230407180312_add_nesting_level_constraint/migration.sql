-- This is an empty migration.

CREATE FUNCTION check_nesting_level_two(parentID uuid) RETURNS BOOLEAN AS $$
BEGIN
    IF parentID IS NULL THEN
        RETURN TRUE;
    END IF;
    RETURN NOT EXISTS(SELECT 1 FROM "topic_comment" WHERE "id" = parentID AND "parent_id" IS NOT NULL);
END;
$$ LANGUAGE plpgsql;

ALTER TABLE "topic_comment" ADD CONSTRAINT "nesting_level" CHECK (check_nesting_level_two(parent_id));